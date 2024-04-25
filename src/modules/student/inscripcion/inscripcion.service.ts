import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class InscripcionService extends PrismaCrudService {
  constructor() {
    super({
      model: 'inscripcion',
      allowedJoins: ['planEstudio', 'estudiante'],
      defaultJoins: ['planEstudio'],
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
