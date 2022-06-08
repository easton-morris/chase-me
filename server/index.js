require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

// GET>> gets all unique card names from the list of cards //

app.get('/api/cards/names', (req, res, next) => {
  const sql = `
    SELECT DISTINCT "cardName"
    FROM "cards"
    ORDER BY "cardName" ASC
  `;
  db.query(sql)
    .then(result => {
      const currNameList = [];
      for (let ii = 0; ii < result.rows.length; ii++) {
        currNameList.push(result.rows[ii].cardName);
      }
      res.json(currNameList);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

// GET>> gets a sample of cards off of the top of the list of cards //

app.get('/api/cards/sample/:limit', (req, res, next) => {
  const limit = parseInt(req.params.limit, 10);
  if (!Number.isInteger(limit) || limit < 1) {
    throw new ClientError(400, 'limit must be a positive integer');
  }

  if (!limit) {
    throw new ClientError(400, 'limit is required');
  }
  const sql = `
    SELECT "cardObj"
    FROM "cards"
    ORDER BY "cardName" ASC
    LIMIT $1
  `;
  const params = [limit];
  db.query(sql, params)
    .then(result => {
      const currPokeList = [];
      for (let ii = 0; ii < result.rows.length; ii++) {
        currPokeList.push(JSON.parse(result.rows[ii].cardObj));
      }
      res.json(currPokeList);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

// GET>> gets a card by its specific card ID //

app.get('/api/cards/:id', (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new ClientError(400, 'id is required');
  }
  const sql = `
    SELECT *
    FROM "cards"
    WHERE "cardId" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(400, 'card does not exist');
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

// GET>> gets a users lists' info by its specific userId //

app.get('/api/lists/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  if (!userId) {
    throw new ClientError(400, 'id is required');
  }
  if (!Number.isInteger(userId) || userId < 1) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    SELECT *
    FROM "lists"
    WHERE "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(400, 'user has no lists');
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));
});

// PATCH>> checks a user's password to make sure it matches before signing in

app.patch('/api/users/sign-in', (req, res, next) => {
  let userId = null;
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  const sql = `
    SELECT *
    FROM "users"
    WHERE "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, 'username does not exist');
      } else {
        userId = result.rows[0].userId;
        argon2.verify(result.rows[0].hashPw, password)
          .then(result => {
            if (result) {
              res.statusMessage = userId;
              res.sendStatus(200);
            } else {
              res.sendStatus(400);
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// POST>> adds a user and their hashed password to the db //

app.post('/api/users/sign-up', (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  const sql = `
    SELECT *
    FROM "users"
    WHERE "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      if (result.rows[0]) {
        throw new ClientError(409, 'username already exists');
      } else {
        argon2.hash(password)
          .then(hashedPW => {
            const sql = `
             INSERT INTO "users" ("username", "email", "hashPw")
             VALUES ($1, $2, $3)
             RETURNING *
            `;
            const params = [username, email, hashedPW];
            db.query(sql, params)
              .then(result => {
                const [newSignUp] = result.rows;
                res.status(201).json(newSignUp);
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));

});

// GET>> gets all cards from a list using the listID //

app.get('/api/cardLists/:listId', (req, res, next) => {
  const listId = parseInt(req.params.listId, 10);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new ClientError(400, 'listId must be a positive integer');
  }

  if (!listId) {
    throw new ClientError(400, 'listId is required');
  }

  const sql = `
    SELECT "cardId"
    FROM "cardLists"
    WHERE "listId" = $1
  `;
  const params = [listId];
  db.query(sql, params)
    .then(result => {
      if (result.rows[0]) {
        res.status(200).json(result.rows);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

// POST>> adds a new list to the table along with the userID, listName, and cards sent in the body //

app.post('/api/lists/new-list', (req, res, next) => {
  const { userId, listName } = req.body;

  if (!userId) {
    throw new ClientError(400, 'user must be signed in to save list');
  }
  const sql = `
    INSERT INTO "lists" ("userId", "listName", "cards")
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const params = [userId, listName, []];
  db.query(sql, params)
    .then(result => {
      const [newList] = result.rows;
      res.status(201).json(newList);
    })
    .catch(err => next(err));
});

// PATCH>> adds a card to the list using the listId //

app.patch('/api/cardLists/:listId', (req, res, next) => {
  const { cardId } = req.body;
  const listId = parseInt(req.params.listId, 10);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new ClientError(400, 'listId must be a positive integer');
  }

  if (!listId) {
    throw new ClientError(400, 'listId is required');
  }

  const sql = `
    SELECT "cardId"
    FROM "cardLists"
    WHERE "listId" = $1
  `;
  const params = [listId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(400, 'Something went wrong');
      } else {
        return result.rows;
      }
    })
    .then(result => {
      const currCardList = result;
      const cardCheck = currCardList.find(el => el === { cardId: cardId });
      if (cardCheck) {
        throw new ClientError(400, 'card is already in list');
      } else {
        const sql = `
        INSERT INTO "cardLists" ("listId", "cardId")
        VALUES ($1, $2)
        RETURNING *
      `;
        const params = [listId, cardId];
        db.query(sql, params)
          .then(result => {
            const [newList] = result.rows;
            if (!newList) {
              throw new ClientError(400, 'Something went wrong');
            } else {
              res.status(200).json(newList);
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// DELETE>> deletes a card from the list using the cardId and listId //

app.delete('/api/cardLists/:listId', (req, res, next) => {
  const { cardId } = req.body;
  const listId = parseInt(req.params.listId, 10);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new ClientError(400, 'listId must be a positive integer');
  }

  if (!listId) {
    throw new ClientError(400, 'listId is required');
  }

  const sql = `
    SELECT "cardId"
    FROM "cardLists"
    WHERE "listId" = $1
  `;
  const params = [listId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(400, 'Something went wrong');
      } else {
        return result.rows;
      }
    })
    .then(result => {
      const currCardList = result;
      const cardCheck = currCardList.find(el => el === { cardId: cardId });
      if (cardCheck) {
        throw new ClientError(400, 'card is not in list');
      } else {
        const sql = `
          DELETE FROM "cardLists"
          WHERE "listId" = $1 AND "cardId" = $2
          RETURNING *
        `;
        const params = [listId, cardId];
        db.query(sql, params)
          .then(result => {
            const [delItems] = result.rows;
            if (!delItems) {
              throw new ClientError(400, 'Something went wrong');
            } else {
              res.status(200).json(delItems);
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// DELETE>> deletes all cards from the list using the listId //

app.delete('/api/cardLists/all/:listId', (req, res, next) => {
  const listId = parseInt(req.params.listId, 10);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new ClientError(400, 'listId must be a positive integer');
  }

  if (!listId) {
    throw new ClientError(400, 'listId is required');
  }

  const sql = `
    SELECT "cardId"
    FROM "cardLists"
    WHERE "listId" = $1
  `;
  const params = [listId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(400, 'List already empty');
      } else {
        const sql = `
          DELETE FROM "cardLists"
          WHERE "listId" = $1
          RETURNING *
        `;
        const params = [listId];
        db.query(sql, params)
          .then(result => {
            const delItems = result.rows;
            if (!delItems) {
              throw new ClientError(400, 'Something went wrong');
            } else {
              res.status(200).json(delItems);
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// DELETE>> deletes the list using the listId //

app.delete('/api/lists/:listId', (req, res, next) => {
  const listId = parseInt(req.params.listId, 10);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new ClientError(400, 'listId must be a positive integer');
  }

  if (!listId) {
    throw new ClientError(400, 'listId is required');
  }

  const sql = `
    SELECT "cardId"
    FROM "cardLists"
    WHERE "listId" = $1
  `;
  const params = [listId];
  db.query(sql, params)
    .then(result => {
      if (result.rows[0]) {
        throw new ClientError(400, 'List not empty');
      } else {
        const sql = `
        SELECT *
        FROM "lists"
        WHERE "listId" = $1
      `;
        const params = [listId];
        db.query(sql, params)
          .then(result => {
            if (!result.rows) {
              throw new ClientError(400, 'List doesn\'t exist.');
            } else {
              const sql = `
              DELETE FROM "lists"
              WHERE "listId" = $1
              RETURNING *
            `;
              const params = [listId];
              db.query(sql, params)
                .then(result => {
                  const delItems = result.rows;
                  if (!delItems) {
                    throw new ClientError(400, 'Something went wrong');
                  } else {
                    res.status(200).json(delItems);
                  }
                })
                .catch(err => next(err));
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
