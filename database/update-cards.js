const pokemon = require('pokemontcgsdk');
pokemon.configure({ apiKey: '311567c3-099d-4c46-b373-5189bd577b08' });

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

// const insertSql = `
//   INSERT INTO "cards" ("cardId", "cardName", "setName", "smallPic", "largePic", "cardNum", "cardObj")
//   VALUES ($1, $2, $3, $4, $5, $6, $7)
// `;

for (let ii = 1; ii < 50; ii++) {
  pokemon.card.where({ page: ii })
    .then(result => {
      // eslint-disable-next-line
      console.log(result);
      if (result.count === 0) {
        // eslint-disable-next-line
        console.log('reached end of list.');
        return ii;
      } else {
        for (let jj = 0; jj < 250; jj++) {
          const currentCard = result.data[jj];
          // console.log(currentCard);
          // console.log(jj);
          const params = [currentCard.id];
          db.query(checkSql, params)
            .then(result => {
              // console.log(result);
              if (result.rowCount === 0) {
                // eslint-disable-next-line
                // console.log(currentCard);
              // const params = [currentCard.id, currentCard.name, currentCard.set.name, currentCard.images.small, currentCard.images.large, currentCard.number, currentCard];
              //   db.query(insertSql, params);
              }
            })
            // eslint-disable-next-line
            .catch(Error => console.log(Error));
        }
      }
    })
    // eslint-disable-next-line
    .catch(Error => console.log(Error));
}
