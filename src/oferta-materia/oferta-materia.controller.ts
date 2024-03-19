import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OfertaMateriaService } from './oferta-materia.service';
import { CreateOfertaMateriaDto } from './dto/create-oferta-materia.dto';
import { UpdateOfertaMateriaDto } from './dto/update-oferta-materia.dto';

@Controller('oferta-materia')
export class OfertaMateriaController {
  constructor(private readonly ofertaMateriaService: OfertaMateriaService) {}

  @Post()
  async create(@Body() createOfertaMateriaDto: CreateOfertaMateriaDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.ofertaMateriaService.create(createOfertaMateriaDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.ofertaMateriaService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.ofertaMateriaService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfertaMateriaDto: UpdateOfertaMateriaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.ofertaMateriaService.update(id, updateOfertaMateriaDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.ofertaMateriaService.remove(id, { crudQuery });
  }
}
