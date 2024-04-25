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
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('turno')
@ApiTags('ADMIN Turno')
export class TurnoController {
  constructor(
    private readonly turnoService: TurnoService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() createTurnoDto: CreateTurnoDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.turnoService.create(createTurnoDto, {
      crudQuery,
    });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.turnoService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.turnoService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTurnoDto: UpdateTurnoDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.turnoService.update(id, updateTurnoDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.turnoService.remove(id, { crudQuery });
  }
}
