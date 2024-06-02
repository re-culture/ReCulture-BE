/*
  Warnings:

  - Added the required column `updatedAt` to the `CulturePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturePost" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "culturePostId" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_culturePostId_fkey" FOREIGN KEY ("culturePostId") REFERENCES "CulturePost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
