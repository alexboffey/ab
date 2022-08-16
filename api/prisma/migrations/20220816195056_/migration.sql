/*
  Warnings:

  - Added the required column `type` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Evolution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "candy" TEXT NOT NULL,
    "candy_count" TEXT NOT NULL,
    "spawn_chance" INTEGER NOT NULL,
    "avg_spawns" INTEGER NOT NULL,
    "spawn_time" TEXT NOT NULL
);
INSERT INTO "new_Pokemon" ("avg_spawns", "candy", "candy_count", "height", "id", "img", "name", "spawn_chance", "spawn_time", "typeId", "weight") SELECT "avg_spawns", "candy", "candy_count", "height", "id", "img", "name", "spawn_chance", "spawn_time", "typeId", "weight" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
