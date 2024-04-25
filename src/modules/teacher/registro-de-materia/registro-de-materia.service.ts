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
      model: 'registroDeMateria',
      allowedJoins: [
        'inscripcion',
        'inscripcion.estudiante',
        'inscripcion.estudiante.persona',
        'ofertaMateria',
      ],
      defaultJoins: [
        'inscripcion',
        'inscripcion.estudiante',
        'inscripcion.estudiante.persona',
      ],
    });
  }
}
