/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_imageId_fkey`;

-- AlterTable
ALTER TABLE `article` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `image`;
