-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `keylimit` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eakey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eaName` VARCHAR(191) NOT NULL,
    `eaapiKey` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL DEFAULT 'demo',
    `buyStart` DOUBLE NOT NULL DEFAULT 0,
    `buyEnd` DOUBLE NOT NULL DEFAULT 0,
    `sellStart` DOUBLE NOT NULL DEFAULT 0,
    `sellEnd` DOUBLE NOT NULL DEFAULT 0,
    `statusBuy` BOOLEAN NOT NULL DEFAULT false,
    `statusSell` BOOLEAN NOT NULL DEFAULT false,
    `buylotlimit` DOUBLE NOT NULL DEFAULT 0.01,
    `selllotlimit` DOUBLE NOT NULL DEFAULT 0.01,
    `trailingfibo` DOUBLE NOT NULL DEFAULT 0,
    `trailingrang` DOUBLE NOT NULL DEFAULT 0,
    `breakeventrigger` DOUBLE NOT NULL DEFAULT 0,
    `breakevenrang` DOUBLE NOT NULL DEFAULT 0,
    `buylot` DOUBLE NOT NULL DEFAULT 0.01,
    `selllot` DOUBLE NOT NULL DEFAULT 0.01,
    `exp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `eakey_eaapiKey_key`(`eaapiKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eakey` ADD CONSTRAINT `eakey_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
