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
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RoleGuard } from '@/modules/auth/role/role.guard';
import { Roles } from '@/modules/auth/roles/roles.decorator';

@ApiTags('ADMIN Estudiantes')
@Controller('estudiante')
@ApiBearerAuth('access-token') //edit here
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get('buscar')
  @ApiOperation({
    summary: 'Buscar estudiantes por nombre, documento o correo electrónico',
  })
  async searchStudents(@Query('query') query: string) {
    if (!query) {
      return { error: 'No search query provided' };
    }

    const data = await this.estudianteService.searchStudents(query);

    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante creado exitosamente' })
  async create(@Body() createEstudianteDto: CreateEstudianteDto) {
    const created =
      await this.estudianteService.createWithUserAndPerson(createEstudianteDto);
    return created;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiQuery({
    name: 'crudQuery',
    required: false,
    description: 'Consulta adicional para CRUD',
  }) // Parámetro de consulta
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.estudianteService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por su ID' })
  @ApiParam({ name: 'id', description: 'ID del estudiante a buscar' })
  @ApiQuery({
    name: 'crudQuery',
    required: false,
    description: 'Consulta adicional para CRUD',
  }) // Parámetro de consulta
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.estudianteService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estudiante por su ID' })
  @ApiParam({ name: 'id', description: 'ID del estudiante a actualizar' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado exitosamente',
  }) // Respuesta exitosa
  async update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.estudianteService.update(
      id,
      updateEstudianteDto,
      { crudQuery },
    );
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante por su ID' })
  @ApiParam({ name: 'id', description: 'ID del estudiante a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado exitosamente',
  }) // Respuesta exitosa
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.estudianteService.remove(id, { crudQuery });
  }
}
