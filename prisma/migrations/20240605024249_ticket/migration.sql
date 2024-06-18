-- CreateTable
CREATE TABLE "TicketPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "disclosure" "DisclosureType" NOT NULL,
    "review" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "ticketPostId" INTEGER NOT NULL,

    CONSTRAINT "TicketPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketPost" ADD CONSTRAINT "TicketPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketPhoto" ADD CONSTRAINT "TicketPhoto_ticketPostId_fkey" FOREIGN KEY ("ticketPostId") REFERENCES "TicketPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
