-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "s1" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "s1_pointsLost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_pointsWon" INTEGER NOT NULL DEFAULT 0;
