import { PrismaCrudService } from 'nestjs-prisma-crud';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto, LoginUsuarioDto, UpdatePasswordDto } from './dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { Usuario } from '@prisma/client';

interface FormatLogin extends Partial<Usuario> {
  correo: string;
}

@Injectable()
export class UsuarioService extends PrismaCrudService {
  constructor(private prisma: PrismaService) {
    super({
      model: 'usuario',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  async register(userDto: CreateUsuarioDto): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.prisma.usuario.findFirst({
      where: { correo: userDto.correo },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }

    return await this.prisma.usuario.create({
      data: {
        ...userDto,
        rol: 'ESTUDIANTE',
        contrasena: await hash(userDto.contrasena, 10),
      },
    });
  }

  async updatePassword(
    payload: UpdatePasswordDto,
    id: string,
  ): Promise<Usuario> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(payload.old_password, user.contrasena);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.usuario.update({
      where: { id },
      data: { contrasena: await hash(payload.new_password, 10) },
    });
  }

  //use by auth module to login user
  async findByLogin({
    correo,
    contrasena,
  }: LoginUsuarioDto): Promise<FormatLogin> {
    const user = await this.prisma.usuario.findFirst({
      where: { correo },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(contrasena, user.contrasena);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { contrasena: p, ...rest } = user;
    return rest;
  }

  //use by auth module to get user in database
  async findByPayload({ correo }: any): Promise<any> {
    return await this.prisma.usuario.findFirst({
      where: { correo },
    });
  }
}
