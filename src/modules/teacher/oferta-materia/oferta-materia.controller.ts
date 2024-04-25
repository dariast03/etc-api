import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OfertaMateriaService } from './oferta-materia.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/modules/auth/roles/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RoleGuard } from '@/modules/auth/role/role.guard';

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJZYW5ldEBleGFtcGxlLmNvbSIsInJvbCI6IkRPQ0VOVEUiLCJpYXQiOjE3MTMwNjA1NjgsImV4cCI6MTcxODI0NDU2OH0.pi-rdCbEitGD8R_5JWIuRYxa85mfYGfYiKQYBIfSrzM
@Controller('oferta-materia')
@ApiTags('DOCENTE Oferta Materia')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('DOCENTE')
export class OfertaMateriaController {
  constructor(private readonly ofertaMateriaService: OfertaMateriaService) {}

  @Get()
  async findMany(
    @Request() req,
    @Query('crudQuery')
    crudQuery: string = '{}',
  ) {
    const idDocente = req.user.id;

    const crudQueryParsed = JSON.parse(crudQuery);

    const matches = await this.ofertaMateriaService.findMany({
      crudQuery: {
        ...crudQueryParsed,
        where: {
          ...crudQueryParsed?.where,
          idDocente,
        },
      },
    });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string = '{}',
  ) {
    const idDocente = req.user.id;

    const match = await this.ofertaMateriaService.findOne(id, {
      crudQuery: {
        where: {
          idDocente,
        },
      },
    });
    return match;
  }
}
