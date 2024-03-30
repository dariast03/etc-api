import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class OfertaMateriaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'ofertaMateria',
      allowedJoins: ['aula', 'turno', 'materia'],
      defaultJoins: ['aula', 'turno', 'materia'],
    });
  }
}
