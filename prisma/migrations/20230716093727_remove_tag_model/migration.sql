/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagsToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TagsToTask" DROP CONSTRAINT "_TagsToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagsToTask" DROP CONSTRAINT "_TagsToTask_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_TagsToTask";
