import { Module } from '@nestjs/common';
import { ShopWarehouseService } from './shop-warehouse.service';
import { ShopWarehouseController } from './shop-warehouse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopWarehouseReq, ShopWarehouseReqSchema } from './schemas/shop-warehouse-req.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ShopWarehouseReq.name, schema: ShopWarehouseReqSchema }])],
  providers: [ShopWarehouseService],
  controllers: [ShopWarehouseController],
})
export class ShopWarehouseModule {}
