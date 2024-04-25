import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt.strategy';

import { Role, Usuario } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '@/prisma.service';
import { UsuarioService } from '../admin/usuario/usuario.service';
import { CreateUsuarioDto, LoginUsuarioDto } from '../admin/usuario/dto';
// import {User} from "../users/user.entity";

type CreateToken = {
  correo: string;
  rol: Role;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsuarioService,
  ) {}

  async register(userDto: CreateUsuarioDto) {
    // // check if the user exists in the db
    const userInDb = await this.prisma.usuario.findFirst({
      where: { correo: userDto.correo },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }

    const user = await this.prisma.usuario.create({
      data: {
        ...userDto,
        contrasena: await hash(userDto.contrasena, 10),
      },
    });

    return user;
  }

  async refreshToken(user: JwtPayload): Promise<string> {
    const token = this._createToken({
      correo: user.correo,
      rol: user.rol as Role,
    });

    return {
      ...token,
      data: user,
    };
  }

  async login(loginUserDto: LoginUsuarioDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    const token = this._createToken(user as CreateToken);

    const { contrasena, ...result } = user as Usuario;

    return {
      ...token,
      data: result,
    };
  }

  private _createToken({ correo, rol }: CreateToken): any {
    const user: JwtPayload = { correo, rol };
    const token = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: Usuario;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: Usuario[];
}
