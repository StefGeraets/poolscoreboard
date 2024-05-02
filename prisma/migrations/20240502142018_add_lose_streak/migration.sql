-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "s1_currentLoseStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_longestLoseStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "s1_onALoseStreak" BOOLEAN NOT NULL DEFAULT false;
