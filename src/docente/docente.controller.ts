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
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Docentes')
@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Post()
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    const created =
      await this.docenteService.createWithUserAndPerson(createDocenteDto);
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.docenteService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.docenteService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocenteDto: UpdateDocenteDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.docenteService.update(id, updateDocenteDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.docenteService.remove(id, { crudQuery });
  }
}
