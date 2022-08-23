import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopWarehouseModule } from './shop-warehouse/shop-warehouse.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:fyDl5TP8g8DGc25G@requesthandler.4bbyhlw.mongodb.net/?retryWrites=true&w=majority'), ShopWarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
