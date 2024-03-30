/*
  Warnings:

  - Added the required column `idAula` to the `OfertaMateria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ofertamateria` ADD COLUMN `idAula` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idAula_fkey` FOREIGN KEY (`idAula`) REFERENCES `Aula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
