/*
  Warnings:

  - You are about to drop the column `s1_prevScore` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "s1_prevScore",
ADD COLUMN     "s1_dayScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_longestStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_monthScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_weekScore" INTEGER NOT NULL DEFAULT 0;
