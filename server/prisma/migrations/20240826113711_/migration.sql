-- AlterTable
ALTER TABLE `article` ADD COLUMN `imageId` INTEGER UNSIGNED NULL;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `src` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
