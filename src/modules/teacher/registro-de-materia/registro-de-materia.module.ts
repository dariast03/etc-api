import { Module } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RegistroDeMateriaController } from './registro-de-materia.controller';
import { RegistroDeMateriaService } from './registro-de-materia.service';
import { UsuarioService } from '@/modules/admin/usuario/usuario.service';

@Module({
  controllers: [RegistroDeMateriaController],
  providers: [
    RegistroDeMateriaService,
    AuthService,
    JwtService,
    UsuarioService,
  ],
})
export class DocenteRegistroDeMateriaModule {}
