import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { PrismaService } from 'src/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EstudianteService extends PrismaCrudService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {
    super({
      model: 'estudiante',
      allowedJoins: ['persona', 'usuario'],
      defaultJoins: ['persona', 'usuario'],
    });
  }

  async createWithUserAndPerson(createEstudianteDto: CreateEstudianteDto) {
    const { persona, usuario } = createEstudianteDto;

    const personaDB = await this.prismaService.persona.create({
      data: {
        ...persona,
      },
    });

    const id: string = personaDB.id;

    const usuarioDB = await this.authService.register({
      ...usuario,
      rol: 'ESTUDIANTE',
      id,
    });

    const estudianteDB = await this.prismaService.estudiante.create({
      data: {
        id: id as any,
      },
    });

    return {
      id,
      persona: personaDB,
      usuario: usuarioDB,
    };
  }

  async getMateriasEstudiante(idEstudiante: string, idInscripcion: string) {
    const registroDeMateriaService = new PrismaCrudService({
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
    });

    console.log({
      inscripcion: {
        idInscripcion,
        idEstudiante,
      },
    });
    const registrosDeMateria = await registroDeMateriaService.findMany({
      crudQuery: {
        where: {
          inscripcion: {
            idInscripcion,
            idEstudiante,
          },
        },
      },
    });

    return registrosDeMateria;
  }
}
