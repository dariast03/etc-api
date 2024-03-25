import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  controllers: [EstudianteController],
  providers: [EstudianteService, AuthService, JwtService, UsuarioService],
})
export class EstudianteModule {}
