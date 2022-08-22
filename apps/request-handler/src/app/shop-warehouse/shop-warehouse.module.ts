import { Module } from '@nestjs/common';
import { ShopWarehouseService } from './shop-warehouse.service';
import { ShopWarehouseController } from './shop-warehouse.controller';

@Module({
  providers: [ShopWarehouseService],
  controllers: [ShopWarehouseController],
})
export class ShopWarehouseModule {}
