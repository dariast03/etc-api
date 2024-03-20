/*
  Warnings:

  - You are about to drop the column `gadiel` on the `aula` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `docente` DROP FOREIGN KEY `Docente_id_fkey`;

-- DropForeignKey
ALTER TABLE `estudiante` DROP FOREIGN KEY `Estudiante_id_fkey`;

-- AlterTable
ALTER TABLE `aula` DROP COLUMN `gadiel`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `rol` ENUM('ESTUDIANTE', 'ADMIN', 'DOCENTE') NOT NULL DEFAULT 'ESTUDIANTE',
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `persona_docente_fk` FOREIGN KEY (`id`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `usuario_docente_fk` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudiante` ADD CONSTRAINT `persona_estudiante_fk` FOREIGN KEY (`id`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudiante` ADD CONSTRAINT `usuario_estudiante_fk` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
