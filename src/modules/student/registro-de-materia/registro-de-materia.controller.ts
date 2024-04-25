import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RoleGuard } from '@/modules/auth/role/role.guard';
import { Roles } from '@/modules/auth/roles/roles.decorator';
import { RegistroDeMateriaService } from './registro-de-materia.service';

@ApiTags('ESTUDIANTE Registros Materia')
@Controller('registro-de-materia')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('ESTUDIANTE')
export class RegistroDeMateriaController {
  constructor(
    private readonly registroDeMateriaService: RegistroDeMateriaService,
  ) {}

  @Get()
  async getMateriasEstudiante(
    @Query('idInscripcion') idInscripcion: string,
    @Request() req,
  ) {
    const idEstudiante = req.user.id as string;

    if (!idInscripcion || !idEstudiante) {
      throw new HttpException(
        'La inscripcion es requerida',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.registroDeMateriaService.getMateriasEstudiante(
      idEstudiante,
      idInscripcion,
    );
  }
}
