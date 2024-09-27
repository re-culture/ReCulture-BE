-- CreateIndex
CREATE INDEX "CulturePost_createdAt_authorId_idx" ON "CulturePost"("createdAt", "authorId");

-- CreateIndex
CREATE INDEX "CulturePost_authorId_date_idx" ON "CulturePost"("authorId", "date");

-- CreateIndex
CREATE INDEX "CulturePost_title_idx" ON "CulturePost"("title");

-- CreateIndex
CREATE INDEX "CulturePost_review_idx" ON "CulturePost"("review");
