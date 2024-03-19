import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post()
  async create(@Body() createMateriaDto: CreateMateriaDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.materiaService.create(createMateriaDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.materiaService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.materiaService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMateriaDto: UpdateMateriaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.materiaService.update(id, updateMateriaDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.materiaService.remove(id, { crudQuery });
  }
}
