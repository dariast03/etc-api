import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class RegistroDeMateriaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'registroDeMateria',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
