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
import { OfertaService } from './oferta.service';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('oferta')
@ApiTags('ADMIN Oferta')
export class OfertaController {
  constructor(private readonly ofertaService: OfertaService) {}

  @Post()
  async create(
    @Body() createOfertaDto: CreateOfertaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const created = await this.ofertaService.create(createOfertaDto, {
      crudQuery,
    });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.ofertaService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.ofertaService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfertaDto: UpdateOfertaDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.ofertaService.update(id, updateOfertaDto, {
      crudQuery,
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.ofertaService.remove(id, { crudQuery });
  }
}
