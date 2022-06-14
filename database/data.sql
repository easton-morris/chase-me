INSERT INTO "cards" ("cardId", "cardName", "setName", "smallPic", "largePic", "cardNum", "cardObj")
VALUES ('dp2-19', 'Abomasnow', 'Mysterious Treasures', 'https://images.pokemontcg.io/dp2/19.png', 'https://images.pokemontcg.io/dp2/19_hires.png', 19, '{"id":"dp2-19","name":"Abomasnow","supertype":"Pokémon","subtypes":["Stage 1"],"level":"40","hp":"100","types":["Grass"],"evolvesFrom":"Snover","abilities":[{"name":"Glacier Snow","text":"If Abomasnow is your Active Pokémon and is damaged by an opponent's attack (even if Abomasnow is Knocked Out), the Attacking Pokémon is now Asleep.","type":"Poké-Body"}],"attacks":[{"name":"Heavy Blizzard","cost":["Water","Colorless","Colorless"],"convertedEnergyCost":3,"damage":"60","text":"Flip a coin. If heads, put 1 damage counter on each of your opponent's Benched Pokémon."}],"weaknesses":[{"type":"Fire","value":"+30"}],"retreatCost":["Colorless","Colorless","Colorless"],"convertedRetreatCost":3,"set":{"id":"dp2","name":"Mysterious Treasures","series":"Diamond & Pearl","printedTotal":123,"total":124,"legalities":{"unlimited":"Legal"},"ptcgoCode":"MT","releaseDate":"2007/08/01","updatedAt":"2018/03/04 10:35:00","images":{"symbol":"https://images.pokemontcg.io/dp2/symbol.png","logo":"https://images.pokemontcg.io/dp2/logo.png"}},"number":"19","artist":"Kazuyuki Kano","rarity":"Rare","flavorText":"It whips up blizzards in mountains that are always buried in snow. It is the abominable snowman.","nationalPokedexNumbers":[460],"legalities":{"unlimited":"Legal"},"images":{"small":"https://images.pokemontcg.io/dp2/19.png","large":"https://images.pokemontcg.io/dp2/19_hires.png"},"tcgplayer":{"url":"https://prices.pokemontcg.io/tcgplayer/dp2-19","updatedAt":"2021/12/12","prices":{"normal":{"low":0.45,"mid":0.87,"high":3.05,"market":0.73,"directLow":0.82},"reverseHolofoil":{"low":0.65,"mid":1.22,"high":4.99,"market":3.07,"directLow":null}}},"cardmarket":{"url":"https://prices.pokemontcg.io/cardmarket/dp2-19","updatedAt":"2021/12/12","prices":{"averageSellPrice":0.64,"lowPrice":0.05,"trendPrice":0.02,"germanProLow":null,"suggestedPrice":null,"reverseHoloSell":0.55,"reverseHoloLow":0.29,"reverseHoloTrend":0.59,"lowPriceExPlus":0.05,"avg1":0.35,"avg7":0.5,"avg30":0.75,"reverseHoloAvg1":0.55,"reverseHoloAvg7":0.56,"reverseHoloAvg30":0.53}}}')
RETURNING *;

INSERT INTO "users" ("username", "email", "hashPw")
VALUES ('admin', 'admin@test.com', '$argon2i$v=19$m=4096,t=3,p=1$gRptO+CxNhYRr3SkbyfpJQ$COtXF9uxxIEiHqDW+v0Q8fmPUD3Gmj/+jlp6kkwMPpQ')
RETURNING *;

INSERT INTO "lists" ("userId", "listName", "cards", "capped")
VALUES (1, 'ExampleList', '{}', false)
RETURNING *;

INSERT INTO "cardLists" ("listId", "cardId")
VALUES (1, 'dp2-19')
RETURNING *;
