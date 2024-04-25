import { Module } from '@nestjs/common';
import { PlanEstudioService } from './plan-estudio.service';
import { PlanEstudioController } from './plan-estudio.controller';

@Module({
  controllers: [PlanEstudioController],
  providers: [PlanEstudioService]
})
export class PlanEstudioModule {}
