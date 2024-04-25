import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class AulaService extends PrismaCrudService {
  constructor() {
    super({
      model: 'aula',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
