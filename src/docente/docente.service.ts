import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';

@Injectable()
export class DocenteService extends PrismaCrudService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {
    super({
      model: 'docente',
      allowedJoins: ['persona', 'usuario'],
      defaultJoins: ['persona', 'usuario'],
    });
  }

  async createWithUserAndPerson(createDocenteDto: CreateDocenteDto) {
    const { persona, usuario } = createDocenteDto;

    const personaDB = await this.prismaService.persona.create({
      data: {
        ...persona,
      },
    });

    const id: string = personaDB.id;

    const usuarioDB = await this.authService.register({
      ...usuario,
      rol: 'DOCENTE',
      id,
    });

    const docenteDB = await this.prismaService.docente.create({
      data: {
        id: id,
      },
    });

    return {
      ...docenteDB,
      persona: personaDB,
      usuario: usuarioDB,
    };
  }
}
