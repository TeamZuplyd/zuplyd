import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { companyIDReq, findByCompanyIDRes, ItemCategory, ItemCategoryServiceClient, ItemCategoryWithID, ITEM_CATEGORY_SERVICE_NAME } from './procurement.pb';

@Controller('procurement/item-category')
export class ItemCategoryController {
  private procurementSVC: ItemCategoryServiceClient;

  @Inject(ITEM_CATEGORY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.procurementSVC = this.client.getService<ItemCategoryServiceClient>(ITEM_CATEGORY_SERVICE_NAME);
  }

  @Post('createCategory')
  private async createCategory(@Body() itemCategoryData: ItemCategory): Promise<any> {
    return this.procurementSVC.createCategory(itemCategoryData).pipe(
      map((res) => {
        const response: ItemCategoryWithID = {
          _id: res._id,
          __v: res.__v,
          company_id: res.company_id,
          categoryArr: res.categoryArr,
        };
        return response;
      })
    );
  }

  @Get('findByCompanyID/:companyId')
  private async findByCompanyID(@Param() companyId: companyIDReq): Promise<any> {
    return this.procurementSVC.findByCompanyID(companyId).pipe(
      map((res) => {
        const response: findByCompanyIDRes = {
          itemCategory: res.itemCategory,
          error: res.error,
        };
        return response;
      })
    );
  }
}
