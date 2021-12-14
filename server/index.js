require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

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

app.use(errorMiddleware);

app.get('/api/cards/names', (req, res) => {
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

app.get('/api/cards/objects', (req, res) => {
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

app.patch('api/lists/');

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
