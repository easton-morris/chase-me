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

app.post('/api/users/sign-up', (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

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
});

app.get('/api/lists/:listId', (req, res, next) => {
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
