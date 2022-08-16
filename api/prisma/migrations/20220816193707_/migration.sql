/*
  Warnings:

  - Added the required column `candy` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candy_count` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "candy" TEXT NOT NULL,
    "candy_count" TEXT NOT NULL
);
INSERT INTO "new_Pokemon" ("id", "name", "type") SELECT "id", "name", "type" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
