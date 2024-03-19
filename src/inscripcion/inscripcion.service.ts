import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class InscripcionService extends PrismaCrudService {
  constructor() {
    super({
      model: 'inscripcion',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
