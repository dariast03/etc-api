import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
  controllers: [DocenteController],
  providers: [DocenteService, AuthService, JwtService, UsuarioService],
})
export class DocenteModule {}
