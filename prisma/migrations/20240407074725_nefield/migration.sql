/*
  Warnings:

  - Added the required column `idDocente` to the `OfertaMateria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ofertamateria` ADD COLUMN `idDocente` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idDocente_fkey` FOREIGN KEY (`idDocente`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
