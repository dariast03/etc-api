import { Module } from '@nestjs/common';

import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './prisma.service';
import { TurnoModule } from './modules/admin/turno/turno.module';
import { MateriaModule } from './modules/admin/materia/materia.module';
import { PlanEstudioModule } from './modules/admin/plan-estudio/plan-estudio.module';
import { InscripcionModule } from './modules/admin/inscripcion/inscripcion.module';
import { OfertaMateriaModule } from './modules/admin/oferta-materia/oferta-materia.module';
import { AulaModule } from './modules/admin/aula/aula.module';
import { RegistroDeMateriaModule } from './modules/admin/registro-de-materia/registro-de-materia.module';
import { UsuarioModule } from './modules/admin/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { PersonaModule } from './modules/admin/persona/persona.module';
import { EstudianteModule } from './modules/admin/estudiante/estudiante.module';
import { DocenteModule } from './modules/admin/docente/docente.module';
import { RouterModule } from '@nestjs/core';
import { EstudianteRegistroDeMateriaModule } from './modules/student/registro-de-materia/registro-de-materia.module';
import { EstudianteInscripcionModule } from './modules/student/inscripcion/inscripcion.module';
import { DocenteOfertaMateriaModule } from './modules/teacher/oferta-materia/oferta-materia.module';
import { DocenteRegistroDeMateriaModule } from './modules/teacher/registro-de-materia/registro-de-materia.module';
//import { EstudianteModule } from './modules/estudiante/estudiante.module';
import { OfertaModule } from './modules/admin/oferta/oferta.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    PersonaModule,
    EstudianteModule,
    DocenteModule,
    /* ESTUDIANTE */
    EstudianteRegistroDeMateriaModule,
    EstudianteInscripcionModule,
    /* DOCENTE */
    DocenteOfertaMateriaModule,
    DocenteRegistroDeMateriaModule,
    RouterModule.register([
      {
        path: '/',
        module: AuthModule,
      },
      {
        path: 'admin',
        children: [
          {
            path: '/',
            module: TurnoModule,
          },
          {
            path: '/',
            module: MateriaModule,
          },
          {
            path: '/',
            module: PlanEstudioModule,
          },
          {
            path: '/',
            module: InscripcionModule,
          },
          {
            path: '/',
            module: OfertaMateriaModule,
          },
          {
            path: '/',
            module: OfertaModule,
          },
          {
            path: '/',
            module: AulaModule,
          },
          {
            path: '/',
            module: RegistroDeMateriaModule,
          },
          {
            path: '/',
            module: UsuarioModule,
          },
          {
            path: '/',
            module: PersonaModule,
          },
          {
            path: '/',
            module: EstudianteModule,
          },
          {
            path: '/',
            module: DocenteModule,
          },
        ],
      },
      {
        path: 'estudiante',
        children: [
          {
            path: '/',
            module: EstudianteRegistroDeMateriaModule,
          },
          {
            path: '/',
            module: EstudianteInscripcionModule,
          },
        ],
      },
      {
        path: 'docente',
        children: [
          {
            path: '/',
            module: DocenteOfertaMateriaModule,
          },
          {
            path: '/',
            module: DocenteRegistroDeMateriaModule,
          },
        ],
      },
    ]),
    OfertaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
