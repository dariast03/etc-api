import { Test, TestingModule } from '@nestjs/testing';
import { OfertaMateriaController } from './oferta-materia.controller';
import { OfertaMateriaService } from './oferta-materia.service';

describe('OfertaMateriaController', () => {
  let controller: OfertaMateriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertaMateriaController],
      providers: [OfertaMateriaService],
    }).compile();

    controller = module.get<OfertaMateriaController>(OfertaMateriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
