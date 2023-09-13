-- DropIndex
DROP INDEX "User_email_name_idx";

-- CreateIndex
CREATE INDEX "MediaFile_id_notebookId_idx" ON "MediaFile"("id", "notebookId");

-- CreateIndex
CREATE INDEX "Notebook_id_title_userId_idx" ON "Notebook"("id", "title", "userId");

-- CreateIndex
CREATE INDEX "Task_id_title_userId_idx" ON "Task"("id", "title", "userId");

-- CreateIndex
CREATE INDEX "User_email_id_idx" ON "User"("email", "id");
