import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemCategoryWithID } from '../procurement.pb';
import { ItemCategoryDto } from './dto/item-category-obj.dto';
import { itemCategory, ItemCategoryDocument } from './schema/item-category.schema';

@Injectable()
export class ItemCategoryService {
  constructor(@InjectModel(itemCategory.name) private itemCategoryModel: Model<ItemCategoryDocument>) {}

  async createCategory(ItemCategoryObj: ItemCategoryDto): Promise<itemCategory> {
    const createdRequest = await this.itemCategoryModel.create(ItemCategoryObj);
    return createdRequest;
  }

  async findByCompanyID(company_id: string): Promise<any> {
    return this.itemCategoryModel.findOne({ company_id: company_id }).exec();
  }

  async update(id: string, itemCategory: itemCategory): Promise<itemCategory> {
    return await this.itemCategoryModel.findByIdAndUpdate(id, itemCategory, {
      returnOriginal: false,
    });
  }
}
