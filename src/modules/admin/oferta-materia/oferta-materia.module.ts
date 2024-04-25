import { Module } from '@nestjs/common';
import { OfertaMateriaService } from './oferta-materia.service';
import { OfertaMateriaController } from './oferta-materia.controller';

@Module({
  controllers: [OfertaMateriaController],
  providers: [OfertaMateriaService]
})
export class OfertaMateriaModule {}
