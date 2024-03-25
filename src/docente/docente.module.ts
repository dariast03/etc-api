import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  controllers: [DocenteController],
  providers: [DocenteService, AuthService, JwtService, UsuarioService],
})
export class DocenteModule {}
