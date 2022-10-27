import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProcurementController } from './supplier-procurement.controller';

describe('SupplierProcurementController', () => {
  let controller: SupplierProcurementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierProcurementController],
    }).compile();

    controller = module.get<SupplierProcurementController>(SupplierProcurementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
