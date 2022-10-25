import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { ItemCategoryModule } from './item-category/item-category.module';

@Module({
  imports: [ItemModule, MongooseModule.forRoot('mongodb+srv://procurement_admin:LPzYheYG728W8hJY@cluster0.plqq4rb.mongodb.net/?retryWrites=true&w=majority'), ItemCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
