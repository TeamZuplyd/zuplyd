import { Test, TestingModule } from '@nestjs/testing';
import { ProcurementService } from './procurement.service';

describe('ProcurementService', () => {
  let service: ProcurementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcurementService],
    }).compile();

    service = module.get<ProcurementService>(ProcurementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
