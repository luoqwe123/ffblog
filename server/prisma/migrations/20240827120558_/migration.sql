/*
  Warnings:

  - You are about to drop the column `imageId` on the `article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `article_imageId_fkey` ON `article`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `imageId`;
