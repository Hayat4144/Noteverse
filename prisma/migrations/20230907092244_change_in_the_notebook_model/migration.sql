/*
  Warnings:

  - Made the column `title` on table `Notebook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notebook" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
