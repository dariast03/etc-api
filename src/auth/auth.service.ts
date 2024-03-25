import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto, LoginUsuarioDto, RoleEnum } from '../usuario/dto';
import { JwtPayload } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma.service';
import { Role, Usuario } from '@prisma/client';
import { hash } from 'bcrypt';
// import {User} from "../users/user.entity";

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

  async login(loginUserDto: LoginUsuarioDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  private _createToken({ correo }): any {
    const user: JwtPayload = { correo };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
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
