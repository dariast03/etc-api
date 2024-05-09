import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class OfertaMateriaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'ofertaMateria',
      allowedJoins: [
        'aula',
        'turno',
        'materia',
        'docente',
        'docente.persona',
        'oferta',
      ],
      defaultJoins: [
        'aula',
        'turno',
        'materia',
        'docente',
        'docente.persona',
        'oferta',
      ],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }
}
