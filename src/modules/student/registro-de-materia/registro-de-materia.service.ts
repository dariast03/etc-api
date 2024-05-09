import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class RegistroDeMateriaService extends PrismaCrudService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {
    super({
      model: 'estudiante',
      allowedJoins: ['persona', 'usuario'],
      defaultJoins: ['persona', 'usuario'],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }

  async getMateriasEstudiante(idEstudiante: string, idInscripcion: string) {
    const registroDeMateriaService = new PrismaCrudService({
      model: 'registroDeMateria',
      allowedJoins: [
        'inscripcion',
        'ofertaMateria',
        'ofertaMateria.materia',
        'ofertaMateria.turno',
        'ofertaMateria.aula',
        'ofertaMateria.docente.persona',
      ],
      defaultJoins: [
        'inscripcion',
        'ofertaMateria',
        'ofertaMateria.materia',
        'ofertaMateria.turno',
        'ofertaMateria.aula',
        'ofertaMateria.docente.persona',
      ],
    });

    const registrosDeMateria = await registroDeMateriaService.findMany({
      crudQuery: {
        where: {
          inscripcion: {
            id: idInscripcion,
            idEstudiante,
          },
        },
      },
    });

    return registrosDeMateria;
  }
}
