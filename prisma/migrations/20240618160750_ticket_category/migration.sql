/*
  Warnings:

  - Added the required column `categoryId` to the `TicketPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketPost" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TicketPost" ADD CONSTRAINT "TicketPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
