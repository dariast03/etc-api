import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inscripciones')
@Controller('inscripcion')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @Post()
  async create(
    @Body() createInscripcionDto: CreateInscripcionDto,
    @Query('crudQuery') crudQuery: string,
  ) {
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
