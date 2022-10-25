import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { companyIDReq, ItemCategory, ITEM_CATEGORY_SERVICE_NAME } from '../procurement.pb';
import { ItemCategoryDto } from './dto/item-category-obj.dto';
import { ItemCategoryService } from './item-category.service';

@Controller('item-category')
export class ItemCategoryController {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  //TODO: complete if condition
  @GrpcMethod(ITEM_CATEGORY_SERVICE_NAME, 'createCategory')
  async createCategory(@Body() itemCategoryDto: ItemCategory) {
    let categoryFromDB = await this.itemCategoryService.findByCompanyID(itemCategoryDto.company_id);
    if (categoryFromDB) {
      if (!categoryFromDB.categoryArr.includes(itemCategoryDto.categoryArr)) {
        categoryFromDB.categoryArr.push(itemCategoryDto.categoryArr);
      }
      return this.itemCategoryService.createCategory(categoryFromDB);
    } else {
      let categoryArr = [];
      categoryArr.push(itemCategoryDto.categoryArr);
      let itemCategoryObj = {
        company_id: itemCategoryDto.company_id,
        categoryArr: categoryArr,
      };

      return this.itemCategoryService.createCategory(itemCategoryObj);
    }
  }

  @GrpcMethod(ITEM_CATEGORY_SERVICE_NAME, 'findByCompanyID')
  async findByCompanyID(id: companyIDReq) {
    const categoryObj = await this.itemCategoryService.findByCompanyID(id.companyId);
    console.log(categoryObj);
    if (categoryObj) {
      return { itemCategory: categoryObj };
    } else {
      return { error: 'no_such_item' };
    }
  }

  update(@Body() itemCategoryReq: any) {
    return this.itemCategoryService.update(itemCategoryReq._id, itemCategoryReq);
  }
}
