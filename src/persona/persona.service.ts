import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class PersonaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'persona',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
