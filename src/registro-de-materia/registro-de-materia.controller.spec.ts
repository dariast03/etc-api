import { Test, TestingModule } from '@nestjs/testing';
import { RegistroDeMateriaController } from './registro-de-materia.controller';
import { RegistroDeMateriaService } from './registro-de-materia.service';

describe('RegistroDeMateriaController', () => {
  let controller: RegistroDeMateriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroDeMateriaController],
      providers: [RegistroDeMateriaService],
    }).compile();

    controller = module.get<RegistroDeMateriaController>(RegistroDeMateriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
