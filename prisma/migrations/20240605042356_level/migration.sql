-- CreateEnum
CREATE TYPE "LevelName" AS ENUM ('Freshman', 'Sophomore', 'Junior', 'Senior');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" "LevelName" NOT NULL DEFAULT 'Freshman',
ADD COLUMN     "levelId" INTEGER NOT NULL DEFAULT 1;
