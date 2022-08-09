import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}

    @Post()
    async create(@Body() createItemTypeDto: CreateItemTypeDto){
      if (await this.itemService.findOne(createItemTypeDto.item_name)){
        throw new BadRequestException("Item alredy exists");
      }else{
        let createdItemType = await this.itemService.createItemType(createItemTypeDto);
        return createdItemType;
      }
    }

    @Post(':id')
    async update(@Param('id') id: string, @Body() item: Item){
      return await this.itemService.UpdateItemType(id, item)
    }

    @Get()
    async findAll(): Promise<Item[]>{
      let items = await this.itemService.findAll();
      return items;
    }

    @Get(':id')
    async findByIdPublic(@Param('id') id: string): Promise<Item>{
      let item = await this.itemService.findOneById(id);
      return item;
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
      let item = await this.itemService.delete(id);
      return item;
    }
}
