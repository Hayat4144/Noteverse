/*
  Warnings:

  - You are about to drop the column `role` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role",
ADD COLUMN     "type" "UserRole" NOT NULL DEFAULT 'OWNER';
