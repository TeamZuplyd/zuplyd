import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Shop, ShopSchema } from './schemas/shop.schema';
import { ShopService } from './services/shop.service';
import { ShopController } from './controllers/shop.controller';
import { StoreItem, StoreItemSchema } from './schemas/storeitem.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:nESDm2LrDARJWLfs@cluster0.m7waswd.mongodb.net/test?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name: Shop.name, schema: ShopSchema}]), MongooseModule.forFeature([{name: StoreItem.name, schema: StoreItemSchema}])  
  ],
  controllers: [AppController, ShopController],
  providers: [AppService, ShopService],
})
export class AppModule {}
