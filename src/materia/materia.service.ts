import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class MateriaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'materia',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
