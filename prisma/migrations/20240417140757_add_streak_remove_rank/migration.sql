/*
  Warnings:

  - You are about to drop the column `s1_curRanking` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `s1_prevRanking` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "s1_curRanking",
DROP COLUMN "s1_prevRanking",
ADD COLUMN     "s1_currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_onAStreak" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "s1_prevScore" INTEGER NOT NULL DEFAULT 0;
