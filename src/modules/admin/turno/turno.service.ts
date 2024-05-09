import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class TurnoService extends PrismaCrudService {
  constructor() {
    super({
      model: 'turno',
      allowedJoins: [],
      defaultJoins: [],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }
}
