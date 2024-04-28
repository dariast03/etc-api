import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegistroDeMateriaService } from './registro-de-materia.service';
import { CreateRegistroDeMateriaDto } from './dto/create-registro-de-materia.dto';
import { UpdateRegistroDeMateriaDto } from './dto/update-registro-de-materia.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/prisma.service';

@Controller('registro-de-materia')
@ApiTags('ADMIN Registro Materia')
export class RegistroDeMateriaController {
  constructor(
    private readonly registroDeMateriaService: RegistroDeMateriaService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() createRegistroDeMateriaDto: CreateRegistroDeMateriaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    //validate cupo

    const ofertaMateria = await this.prismaService.ofertaMateria.findFirst({
      where: { id: createRegistroDeMateriaDto.idOfertaMateria },
    });

    if (!ofertaMateria)
      throw new HttpException(
        'No existe la oferta de materia',
        HttpStatus.BAD_REQUEST,
      );

    if (ofertaMateria.cupoDisponible <= 0)
      throw new HttpException(
        'No hay cupo disponible en esta oferta de materia',
        HttpStatus.BAD_REQUEST,
      );

    const existRegistroInSameMateriaAndSameOffer =
      await this.prismaService.registroDeMateria.findFirst({
        where: {
          idOfertaMateria: createRegistroDeMateriaDto.idOfertaMateria,
          idInscripcion: createRegistroDeMateriaDto.idInscripcion,
          estado: {
            not: {
              equals: 'ABANDONADO',
            },
          },
        },
      });

    if (existRegistroInSameMateriaAndSameOffer)
      throw new HttpException(
        'El estudiante ya tiene un registro en esta materia y en la misma oferta',
        HttpStatus.BAD_REQUEST,
      );

    const created = await this.registroDeMateriaService.create(
      createRegistroDeMateriaDto,
      { crudQuery },
    );

    if (ofertaMateria) {
      await this.prismaService.ofertaMateria.update({
        where: { id: ofertaMateria.id },
        data: {
          cupoDisponible: ofertaMateria.cupoDisponible - 1,
        },
      });
    }

    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.registroDeMateriaService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.registroDeMateriaService.findOne(id, {
      crudQuery,
    });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegistroDeMateriaDto: UpdateRegistroDeMateriaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    if (
      updateRegistroDeMateriaDto.nota == null ||
      updateRegistroDeMateriaDto.nota == undefined
    ) {
      updateRegistroDeMateriaDto.nota = null;
    } else if (
      updateRegistroDeMateriaDto.nota >= 0 &&
      updateRegistroDeMateriaDto.nota < 51
    ) {
      updateRegistroDeMateriaDto.estado = 'REPROBADO';
    } else if (
      updateRegistroDeMateriaDto.nota >= 51 &&
      updateRegistroDeMateriaDto.nota <= 100
    ) {
      updateRegistroDeMateriaDto.estado = 'APROBADO';
    }

    const updated = await this.registroDeMateriaService.update(
      id,
      updateRegistroDeMateriaDto,
      { crudQuery },
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.registroDeMateriaService.remove(id, { crudQuery });
  }
}
