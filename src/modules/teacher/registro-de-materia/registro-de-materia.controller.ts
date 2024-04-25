import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Put,
  Patch,
  Param,
  Body,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RoleGuard } from '@/modules/auth/role/role.guard';
import { Roles } from '@/modules/auth/roles/roles.decorator';
import { RegistroDeMateriaService } from './registro-de-materia.service';
import { UpdateNotaDto } from './dto/update-nota.dto';

@ApiTags('DOCENTE Registros Materia')
@Controller('registro-de-materia')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('DOCENTE')
export class RegistroDeMateriaController {
  constructor(
    private readonly registroDeMateriaService: RegistroDeMateriaService,
  ) {}

  @Get()
  async getMateriasEstudiante(
    @Query('idOfertaMateria') idOfertaMateria: string,
    @Request() req,
  ) {
    const idDocente = req.user.id as string;

    if (!idOfertaMateria || !idDocente) {
      throw new HttpException(
        'La oferta de materia es requerida',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.registroDeMateriaService.findMany({
      crudQuery: {
        where: {
          ofertaMateria: {
            idDocente,
            id: idOfertaMateria,
          },
        },
      },
    });
  }

  // method to update nota for a student
  @Patch('actualizar-nota')
  async update(@Request() req, @Body() updateNotaDto: UpdateNotaDto) {
    const idDocente = req.user.id as string;

    const { id } = updateNotaDto;

    const updated = await this.registroDeMateriaService.update(
      id,
      updateNotaDto,
      {
        crudQuery: {
          where: {
            ofertaMateria: {
              idDocente,
            },
          },
        },
      },
    );
    return updated;
  }
}
