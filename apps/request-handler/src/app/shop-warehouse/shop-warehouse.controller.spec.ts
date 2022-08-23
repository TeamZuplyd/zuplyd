import { Test, TestingModule } from '@nestjs/testing';
import { ShopWarehouseController } from './shop-warehouse.controller';

describe('ShopWarehouseController', () => {
  let controller: ShopWarehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopWarehouseController],
    }).compile();

    controller = module.get<ShopWarehouseController>(ShopWarehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
