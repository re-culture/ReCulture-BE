/*
  Warnings:

  - You are about to drop the column `detail5` on the `CulturePost` table. All the data in the column will be lost.
  - Made the column `emoji` on table `CulturePost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CulturePost" DROP COLUMN "detail5",
ALTER COLUMN "emoji" SET NOT NULL,
ALTER COLUMN "detail1" DROP NOT NULL,
ALTER COLUMN "detail2" DROP NOT NULL,
ALTER COLUMN "detail3" DROP NOT NULL,
ALTER COLUMN "detail4" DROP NOT NULL;
