/*
  Warnings:

  - You are about to drop the column `type` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `avg_spawns` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spawn_chance` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spawn_time` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

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
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "candy" TEXT NOT NULL,
    "candy_count" TEXT NOT NULL,
    "spawn_chance" INTEGER NOT NULL,
    "avg_spawns" INTEGER NOT NULL,
    "spawn_time" TEXT NOT NULL,
    CONSTRAINT "Pokemon_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PokemonType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("candy", "candy_count", "height", "id", "img", "name", "weight") SELECT "candy", "candy_count", "height", "id", "img", "name", "weight" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
