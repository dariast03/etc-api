/*
  Warnings:

  - Made the column `nroDocumento` on table `persona` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `persona` MODIFY `nroDocumento` VARCHAR(191) NOT NULL;
