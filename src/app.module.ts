import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './prisma.service';
import { TurnoModule } from './turno/turno.module';
import { MateriaModule } from './materia/materia.module';
import { PlanEstudioModule } from './plan-estudio/plan-estudio.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { OfertaMateriaModule } from './oferta-materia/oferta-materia.module';
import { AulaModule } from './aula/aula.module';
import { RegistroDeMateriaModule } from './registro-de-materia/registro-de-materia.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
    TurnoModule,
    MateriaModule,
    PlanEstudioModule,
    InscripcionModule,
    OfertaMateriaModule,
    AulaModule,
    RegistroDeMateriaModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
