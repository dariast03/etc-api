import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class InscripcionService extends PrismaCrudService {
  constructor() {
    super({
      model: 'inscripcion',
      allowedJoins: ['planEstudio', 'estudiante'],
      defaultJoins: ['planEstudio'],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }

  async getInscripciones(idEstudiante: string) {
    return await this.findMany({
      crudQuery: {
        where: {
          estudiante: {
            id: idEstudiante,
          },
        },
      },
    });
  }
}
