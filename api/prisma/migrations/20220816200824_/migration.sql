/*
  Warnings:

  - You are about to drop the column `type` on the `Pokemon` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PokemonType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "nextEvolutionId" INTEGER,
    "prevEvolutionId" INTEGER,
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
