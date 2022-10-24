import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseController } from './controllers/warehouse.controller';

import { Shop, ShopSchema } from './schemas/shop.schema';
import { ShopService } from './services/shop.service';
import { ShopController } from './controllers/shop.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:nESDm2LrDARJWLfs@cluster0.m7waswd.mongodb.net/test?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name: Warehouse.name, schema: WarehouseSchema}, {name: Shop.name, schema: ShopSchema}])  
  ],
  controllers: [AppController, WarehouseController,ShopController],
  providers: [AppService, WarehouseService, ShopService],
})
export class AppModule {}
