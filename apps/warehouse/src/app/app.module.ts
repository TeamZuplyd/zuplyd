import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { StoreItem, StoreItemSchema } from './schemas/storeitem.schema';
import { Shop, ShopSchema } from './schemas/shop.schema';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseController } from './controllers/warehouse.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:nESDm2LrDARJWLfs@cluster0.m7waswd.mongodb.net/test?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name: Warehouse.name, schema: WarehouseSchema}]), MongooseModule.forFeature([{name: StoreItem.name, schema: StoreItemSchema}]), MongooseModule.forFeature([{name: Shop.name, schema: ShopSchema}])  
  ],
  controllers: [AppController, WarehouseController],
  providers: [AppService, WarehouseService],
})
export class AppModule {}
