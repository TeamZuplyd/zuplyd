import { Test, TestingModule } from '@nestjs/testing';
import { ShopWarehouseService } from './shop-warehouse.service';

describe('ShopWarehouseService', () => {
  let service: ShopWarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopWarehouseService],
    }).compile();

    service = module.get<ShopWarehouseService>(ShopWarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
