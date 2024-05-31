/*
  Warnings:

  - You are about to drop the column `detail5_name` on the `CategoryDetail` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CategoryDetail` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `CulturePost` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `CategoryDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `CulturePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `CulturePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryDetail" DROP COLUMN "detail5_name",
DROP COLUMN "name",
ADD COLUMN     "category_name" TEXT NOT NULL,
ALTER COLUMN "detail4_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CulturePost" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CulturePost" ADD CONSTRAINT "CulturePost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
