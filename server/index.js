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

app.get('/api/cards/objects', (req, res, next) => {
  const sql = `
    SELECT "cardObj"
    FROM "cards"
    ORDER BY "cardName" ASC
    LIMIT 10
  `;
  db.query(sql)
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
  const params = [userId, listName, {}];
  db.query(sql, params)
    .then(result => {
      const [newList] = result.rows;
      res.status(201).json(newList);
    })
    .catch(err => next(err));
});

app.patch('api/lists/');

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
