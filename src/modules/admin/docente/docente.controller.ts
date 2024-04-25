import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../../prisma.service';

@ApiTags('ADMIN Docentes')
@Controller('docente')
export class DocenteController {
  constructor(
    private readonly docenteService: DocenteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    const existsNroDocumento = await this.prismaService.persona.findFirst({
      where: { nroDocumento: createDocenteDto.persona.nroDocumento },
    });

    if (existsNroDocumento)
      throw new HttpException(
        'El nro documento ya se encuentra registrado',
        HttpStatus.BAD_REQUEST,
      );

    const existCorreo = await this.prismaService.usuario.findFirst({
      where: { correo: createDocenteDto.usuario.correo },
    });

    if (existCorreo)
      throw new HttpException(
        'El correo ya se encuentra registrado',
        HttpStatus.BAD_REQUEST,
      );

    const existeCorreoPersonal = await this.prismaService.persona.findFirst({
      where: { correoPersonal: createDocenteDto.persona.correoPersonal },
    });

    if (existeCorreoPersonal)
      throw new HttpException(
        'El correo personal ya se encuentra registrado',
        HttpStatus.BAD_REQUEST,
      );

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
