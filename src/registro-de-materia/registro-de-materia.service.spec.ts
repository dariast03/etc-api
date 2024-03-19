import { Test, TestingModule } from '@nestjs/testing';
import { RegistroDeMateriaService } from './registro-de-materia.service';

describe('RegistroDeMateriaService', () => {
  let service: RegistroDeMateriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroDeMateriaService],
    }).compile();

    service = module.get<RegistroDeMateriaService>(RegistroDeMateriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
