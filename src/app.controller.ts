import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return [
      {
        id: 1,
        nombre: 'Juan',
        carrera: 'Ingeniería Informática',
        materia: 'Programación I',
        nota: 25,
      },
      {
        id: 2,
        nombre: 'Pedro',
        carrera: 'Ingeniería Informática',
        materia: 'Programación I',
        nota: 30,
      },
      {
        id: 3,
        nombre: 'Juan',
        carrera: 'Ingeniería Informática',
        materia: 'Programación I',
        nota: 40,
      },
    ];
  }
}
