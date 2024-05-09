import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class RegistroDeMateriaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'registroDeMateria',
      allowedJoins: [
        'inscripcion',
        'ofertaMateria',
        'ofertaMateria.materia',
        'ofertaMateria.docente.persona',
        'inscripcion',
        'inscripcion.estudiante',
        'inscripcion.estudiante.persona',
        'inscripcion.planEstudio',
      ],
      defaultJoins: [
        'inscripcion',
        'ofertaMateria',
        'ofertaMateria.materia',
        'ofertaMateria.docente.persona',
        'inscripcion',
        'inscripcion.estudiante',
        'inscripcion.estudiante.persona',
        'inscripcion.planEstudio',
      ],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }
}
