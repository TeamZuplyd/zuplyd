import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemCategoryDto } from './dto/item-category-obj.dto';
import { ItemCategoryService } from './item-category.service';

@Controller('item-category')
export class ItemCategoryController {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  //TODO: complete if condition
  @Post('createCategory')
  async createCategory(@Body() ItemCategoryDto: ItemCategoryDto) {
    const categoryFromDB = await this.findByCompanyID(ItemCategoryDto.company_id);
    if (categoryFromDB) {
      console.log(categoryFromDB);
    }
    return this.itemCategoryService.createCategory(ItemCategoryDto);
  }

  @Get('findByCompanyID/:id')
  findByCompanyID(@Param('id') id: string) {
    return this.itemCategoryService.findByCompanyID(id);
  }

  update(@Body() itemCategoryReq: any) {
    return this.itemCategoryService.update(itemCategoryReq._id, itemCategoryReq);
  }
}
