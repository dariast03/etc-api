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
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('aula')
@ApiTags('ADMIN Aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  async create(
    @Body() createAulaDto: CreateAulaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.aulaService.create(createAulaDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.aulaService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.aulaService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAulaDto: UpdateAulaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.aulaService.update(id, updateAulaDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.aulaService.remove(id, { crudQuery });
  }
}
