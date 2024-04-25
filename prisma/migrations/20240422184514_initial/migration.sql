-- CreateTable
CREATE TABLE `Persona` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `nroDocumento` VARCHAR(191) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `correoPersonal` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,

    UNIQUE INDEX `Persona_nroDocumento_key`(`nroDocumento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `id` VARCHAR(191) NOT NULL,
    `especializacion` VARCHAR(191) NULL,

    UNIQUE INDEX `Docente_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudiante` (
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Estudiante_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `rol` ENUM('ESTUDIANTE', 'ADMIN', 'DOCENTE') NOT NULL DEFAULT 'ESTUDIANTE',
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanEstudio` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `duracion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscripcion` (
    `id` VARCHAR(191) NOT NULL,
    `fechaInscripcion` DATETIME(3) NOT NULL,
    `idPlanEstudio` VARCHAR(191) NOT NULL,
    `idEstudiante` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turno` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oferta` (
    `id` VARCHAR(191) NOT NULL,
    `mes` VARCHAR(191) NOT NULL,
    `anio` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfertaMateria` (
    `id` VARCHAR(191) NOT NULL,
    `cupo` INTEGER NOT NULL,
    `cupoDisponible` INTEGER NOT NULL,
    `grupo` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `estado` ENUM('ACTIVO', 'DESACTIVADO') NOT NULL DEFAULT 'ACTIVO',
    `idMateria` VARCHAR(191) NOT NULL,
    `idTurno` VARCHAR(191) NOT NULL,
    `idAula` VARCHAR(191) NOT NULL,
    `idDocente` VARCHAR(191) NOT NULL,
    `idOferta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aula` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistroDeMateria` (
    `id` VARCHAR(191) NOT NULL,
    `nota` DOUBLE NULL,
    `estado` VARCHAR(191) NOT NULL,
    `idInscripcion` VARCHAR(191) NOT NULL,
    `idOfertaMateria` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

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

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_idEstudiante_fkey` FOREIGN KEY (`idEstudiante`) REFERENCES `Estudiante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripcion` ADD CONSTRAINT `Inscripcion_idPlanEstudio_fkey` FOREIGN KEY (`idPlanEstudio`) REFERENCES `PlanEstudio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idTurno_fkey` FOREIGN KEY (`idTurno`) REFERENCES `Turno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idAula_fkey` FOREIGN KEY (`idAula`) REFERENCES `Aula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idDocente_fkey` FOREIGN KEY (`idDocente`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfertaMateria` ADD CONSTRAINT `OfertaMateria_idOferta_fkey` FOREIGN KEY (`idOferta`) REFERENCES `Oferta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroDeMateria` ADD CONSTRAINT `RegistroDeMateria_idInscripcion_fkey` FOREIGN KEY (`idInscripcion`) REFERENCES `Inscripcion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroDeMateria` ADD CONSTRAINT `RegistroDeMateria_idOfertaMateria_fkey` FOREIGN KEY (`idOfertaMateria`) REFERENCES `OfertaMateria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
