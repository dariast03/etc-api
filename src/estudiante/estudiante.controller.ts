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
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Estudiantes')
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

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
