INSERT INTO "users" ("username", "email", "hashPw")
VALUES ('admin', 'admin@test.com', '$argon2i$v=19$m=4096,t=3,p=1$gRptO+CxNhYRr3SkbyfpJQ$COtXF9uxxIEiHqDW+v0Q8fmPUD3Gmj/+jlp6kkwMPpQ')
RETURNING *;

INSERT INTO "lists" ("userId", "listName", "cards", "capped")
VALUES (1, 'ExampleList', [], false)
RETURNING *;

INSERT INTO "cardLists" ("listId", "cardId")
VALUES (1, 'dp2-19')
RETURNING *;
