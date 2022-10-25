import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryController } from './item-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { itemCategory, itemCategorySchema } from './schema/item-category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: itemCategory.name, schema: itemCategorySchema }])],
  providers: [ItemCategoryService],
  controllers: [ItemCategoryController],
})
export class ItemCategoryModule {}
