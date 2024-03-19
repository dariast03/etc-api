/*
  Warnings:

  - Added the required column `gadiel` to the `Aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aula` ADD COLUMN `gadiel` VARCHAR(191) NOT NULL;
