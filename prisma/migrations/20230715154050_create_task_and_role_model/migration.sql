-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('High', 'Low', 'Medium');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "priority" "TaskPriority" NOT NULL DEFAULT 'Low',
    "parent_id" TEXT,
    "is_standalone" BOOLEAN NOT NULL,
    "assignee" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagsToTask" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToTask_AB_unique" ON "_TagsToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToTask_B_index" ON "_TagsToTask"("B");

-- AddForeignKey
ALTER TABLE "_TagsToTask" ADD CONSTRAINT "_TagsToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToTask" ADD CONSTRAINT "_TagsToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
