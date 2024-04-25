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
import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/prisma.service';

@ApiTags('ADMIN Inscripciones')
@Controller('inscripcion')
export class InscripcionController {
  constructor(
    private readonly inscripcionService: InscripcionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() createInscripcionDto: CreateInscripcionDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const exists = await this.prismaService.inscripcion.findFirst({
      where: {
        idEstudiante: createInscripcionDto.idEstudiante,
        idPlanEstudio: createInscripcionDto.idPlanEstudio,
      },
    });

    if (exists)
      throw new HttpException(
        'Ya existe una inscripción para este estudiante en el mismo plan de estudio.',
        HttpStatus.BAD_REQUEST,
      );

    const created = await this.inscripcionService.create(createInscripcionDto, {
      crudQuery,
    });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.inscripcionService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.inscripcionService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInscripcionDto: UpdateInscripcionDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.inscripcionService.update(
      id,
      updateInscripcionDto,
      { crudQuery },
    );
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.inscripcionService.remove(id, { crudQuery });
  }
}
