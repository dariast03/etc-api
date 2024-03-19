import { Test, TestingModule } from '@nestjs/testing';
import { PlanEstudioController } from './plan-estudio.controller';
import { PlanEstudioService } from './plan-estudio.service';

describe('PlanEstudioController', () => {
  let controller: PlanEstudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanEstudioController],
      providers: [PlanEstudioService],
    }).compile();

    controller = module.get<PlanEstudioController>(PlanEstudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
