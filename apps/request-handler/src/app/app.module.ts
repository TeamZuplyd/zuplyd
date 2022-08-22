import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopWarehouseModule } from './shop-warehouse/shop-warehouse.module';

@Module({
  imports: [ShopWarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
