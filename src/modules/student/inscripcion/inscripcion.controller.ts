import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/modules/auth/roles/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RoleGuard } from '@/modules/auth/role/role.guard';

@ApiTags('ESTUDIANTE Inscripciones')
@Controller('inscripcion')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('ESTUDIANTE')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @Get()
  async getInscripciones(@Request() req) {
    const idEstudiante = req.user.id as string;
    return await this.inscripcionService.getInscripciones(idEstudiante);
  }
}
