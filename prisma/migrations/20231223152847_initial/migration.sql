-- CreateTable
CREATE TABLE "award" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "award_category" (
    "id" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    PRIMARY KEY ("id", "awardId", "categoryId"),
    CONSTRAINT "award_category_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "award" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "award_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "game_category" (
    "id" TEXT NOT NULL,
    "awardCategoryId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    PRIMARY KEY ("id", "gameId", "awardCategoryId"),
    CONSTRAINT "game_category_awardCategoryId_fkey" FOREIGN KEY ("awardCategoryId") REFERENCES "award_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_category_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "poll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "gameCategoryId" TEXT NOT NULL,
    "pollDate" DATETIME NOT NULL,
    CONSTRAINT "poll_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "poll_gameCategoryId_fkey" FOREIGN KEY ("gameCategoryId") REFERENCES "game_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "award_category_id_key" ON "award_category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "game_category_id_key" ON "game_category"("id");
