import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class InscripcionService extends PrismaCrudService {
  constructor() {
    super({
      model: 'inscripcion',
      allowedJoins: ['estudiante', 'estudiante.persona', 'planEstudio'],
      defaultJoins: ['estudiante', 'estudiante.persona', 'planEstudio'],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }
}
