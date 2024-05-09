import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class PlanEstudioService extends PrismaCrudService {
  constructor() {
    super({
      model: 'planEstudio',
      allowedJoins: [],
      defaultJoins: [],
      paginationConfig: {
        maxPageSize: 99999999,
        defaultPageSize: 99999999,
      },
    });
  }
}
