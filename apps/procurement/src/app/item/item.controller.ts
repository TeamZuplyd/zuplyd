import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ItemIDRequest, ItemWithID, ITEM_SERVICE_NAME } from '../procurement.pb';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @GrpcMethod(ITEM_SERVICE_NAME, 'create')
  async create(createItemTypeDto: CreateItemTypeDto): Promise<any> {
    if (await this.itemService.findOne(createItemTypeDto.item_name)) {
      return { error: 'item_already_exists' };
    } else {
      return { item: await this.itemService.createItemType(createItemTypeDto) };
    }
  }

  @GrpcMethod(ITEM_SERVICE_NAME, 'update')
  async update(itemData: ItemWithID) {
    const item = await this.itemService.UpdateItemType(itemData._id, itemData);
    if (item) {
      return { item: item };
    } else {
      return { error: 'update_error' };
    }
  }

  @GrpcMethod(ITEM_SERVICE_NAME, 'findAll')
  async findAll(): Promise<any> {
    const items = await this.itemService.findAll();
    const itemList: any = { items: [...items] };
    return itemList;
  }

  @GrpcMethod(ITEM_SERVICE_NAME, 'findByIdPublic')
  async findByIdPublic(id: ItemIDRequest): Promise<any> {
    let item = await this.itemService.findOneById(id.id);
    if (item) {
      return { item: item };
    } else {
      return { error: 'no_such_item' };
    }
  }

  @GrpcMethod(ITEM_SERVICE_NAME, 'delete')
  async delete(id: ItemIDRequest) {
    let item = await this.itemService.delete(id.id);
    if (item) {
      return { item: item };
    } else {
      return { error: 'delete_error' };
    }
  }
}
