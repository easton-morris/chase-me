set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";
CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "hashPw" TEXT NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "lists" (
    "userId" integer NOT NULL,
    "listId" serial NOT NULL,
    "listName" TEXT NOT NULL,
    "cards" TEXT NOT NULL,
    "capped" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "lists_pk" PRIMARY KEY ("listId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "cards" (
    "cardId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "smallPic" TEXT NOT NULL UNIQUE,
    "largePic" TEXT NOT NULL UNIQUE,
    "cardNum" TEXT NOT NULL,
    "cardObj" TEXT NOT NULL,
    "cardObjDate" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "cards_pk" PRIMARY KEY ("cardId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "cardLists" (
    "listId" integer NOT NULL,
    "cardId" TEXT NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "cardLists_pk" PRIMARY KEY ("listId", "cardId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "lists" ADD CONSTRAINT "lists_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "cardLists" ADD CONSTRAINT "cardLists_fk0" FOREIGN KEY ("listId") REFERENCES "lists"("listId");
ALTER TABLE "cardLists" ADD CONSTRAINT "cardLists_fk1" FOREIGN KEY ("cardId") REFERENCES "cards"("cardId");
