import { Test, TestingModule } from '@nestjs/testing';
import { OfertaMateriaService } from './oferta-materia.service';

describe('OfertaMateriaService', () => {
  let service: OfertaMateriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfertaMateriaService],
    }).compile();

    service = module.get<OfertaMateriaService>(OfertaMateriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
