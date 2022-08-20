import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async createItemType(createItemTypeDto: CreateItemTypeDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemTypeDto);
    return createdItem.save();
  }

  async UpdateItemType(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, {
      returnOriginal: false,
    });
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOneById(id: string): Promise<Item> {
    return this.itemModel.findById({ _id: id }).exec();
  }

  async findOne(item_name: string): Promise<Item> {
    return this.itemModel.findOne({ item_name: item_name }).exec();
  }

  async delete(id: string) {
    const deletedItem = await this.itemModel.findByIdAndRemove({ _id: id }).exec();
    return deletedItem;
  }
}
