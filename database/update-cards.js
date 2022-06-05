const pokemon = require('pokemontcgsdk');
pokemon.configure({ apiKey: process.env.PKMN_APIKEY });

require('dotenv/config');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const checkSql = `
  SELECT *
    FROM "cards"
    WHERE "cardId" = $1
`;

const insertSql = `
  INSERT INTO "cards" ("cardId", "cardName", "setName", "smallPic", "largePic", "cardNum", "cardObj")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING "cardId"
`;

for (let ii = 1; ii < 60; ii++) {
  pokemon.card.where({ page: ii })
    .then(result => {
      for (let jj = 0; jj < 250; jj++) {
        const currentCard = result.data[jj];
        const params = [currentCard.id];
        db.query(checkSql, params)
          .then(result => {
            if (result.rowCount === 0) {
              const params = [currentCard.id, currentCard.name, currentCard.set.name, currentCard.images.small, currentCard.images.large, currentCard.number, currentCard];
              db.query(insertSql, params)
                .then(result => {
                  const [newRes] = result.rows;
                  // eslint-disable-next-line
                  console.log(newRes);
                })
                .catch(Error => console.error(Error));
            }
          })
          .catch(Error => console.error(Error));
      }
    })
    .catch(Error => console.error(Error, 'reached end of list.'))
    .finally(() => {
      // eslint-disable-next-line
      console.log(`finished with update, page ${ii}`);
    });
}
