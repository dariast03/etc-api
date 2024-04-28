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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/prisma.service';
import { hash } from 'bcrypt';

@Controller('usuario')
@ApiTags('ADMIN Usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const userInDb = await this.prismaService.usuario.findFirst({
      where: { correo: createUsuarioDto.correo },
    });

    if (userInDb) {
      throw new HttpException(
        'Ya existe un usuario con el mismo correo',
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.prismaService.usuario.create({
      data: {
        ...createUsuarioDto,
        contrasena: await hash(createUsuarioDto.contrasena, 10),
      },
    });

    /*  const created = await this.usuarioService.create(createUsuarioDto, {
      crudQuery,
    }); */
    return user;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.usuarioService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    const match = await this.usuarioService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const userInDb = await this.prismaService.usuario.findFirst({
      where: { id },
    });

    if (!userInDb) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    if (updateUsuarioDto.contrasena) {
      updateUsuarioDto.contrasena = await hash(updateUsuarioDto.contrasena, 10);
    }

    if (updateUsuarioDto.contrasena == '') {
      delete updateUsuarioDto.contrasena;
    }

    console.log({
      updateUsuarioDto,
    });

    const updated = await this.usuarioService.update(id, updateUsuarioDto, {
      crudQuery,
    });

    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.usuarioService.remove(id, { crudQuery });
  }
}
