import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProcurementService } from './supplier-procurement.service';

describe('SupplierProcurementService', () => {
  let service: SupplierProcurementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierProcurementService],
    }).compile();

    service = module.get<SupplierProcurementService>(SupplierProcurementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
