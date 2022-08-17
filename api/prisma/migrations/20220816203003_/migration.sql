/*
  Warnings:

  - You are about to drop the column `img` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `nextEvolutionId` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `prevEvolutionId` on the `Pokemon` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "candy" TEXT NOT NULL,
    "candy_count" TEXT NOT NULL,
    "spawn_chance" INTEGER NOT NULL,
    "avg_spawns" INTEGER NOT NULL,
    "spawn_time" TEXT NOT NULL
);
INSERT INTO "new_Pokemon" ("avg_spawns", "candy", "candy_count", "height", "id", "name", "spawn_chance", "spawn_time", "typeId", "weight") SELECT "avg_spawns", "candy", "candy_count", "height", "id", "name", "spawn_chance", "spawn_time", "typeId", "weight" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
