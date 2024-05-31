-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('MOVIE', 'MUSICAL', 'THEATER', 'SPORTS', 'CONCERT', 'DRAMA', 'BOOK', 'EXHIBITION', 'OTHER');

-- CreateEnum
CREATE TYPE "DisclosureType" AS ENUM ('PUBLIC', 'FOLLOWER', 'PRIVATE');

-- CreateTable
CREATE TABLE "CulturePost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "category" INTEGER NOT NULL,
    "disclosure" "DisclosureType" NOT NULL,
    "detail1" TEXT NOT NULL,
    "detail2" TEXT NOT NULL,
    "detail3" TEXT NOT NULL,
    "detail4" TEXT NOT NULL,
    "detail5" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "CulturePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryDetail" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "detail1_name" TEXT NOT NULL,
    "detail2_name" TEXT NOT NULL,
    "detail3_name" TEXT NOT NULL,
    "detail4_name" TEXT NOT NULL,
    "detail5_name" TEXT,

    CONSTRAINT "CategoryDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CulturePost" ADD CONSTRAINT "CulturePost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
