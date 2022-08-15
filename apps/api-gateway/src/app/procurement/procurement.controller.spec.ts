import { Test, TestingModule } from '@nestjs/testing';
import { ProcurementController } from './procurement.controller';

describe('ProcurementController', () => {
  let controller: ProcurementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcurementController],
    }).compile();

    controller = module.get<ProcurementController>(ProcurementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
