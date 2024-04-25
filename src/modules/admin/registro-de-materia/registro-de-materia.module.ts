import { Module } from '@nestjs/common';
import { RegistroDeMateriaService } from './registro-de-materia.service';
import { RegistroDeMateriaController } from './registro-de-materia.controller';

@Module({
  controllers: [RegistroDeMateriaController],
  providers: [RegistroDeMateriaService]
})
export class RegistroDeMateriaModule {}
