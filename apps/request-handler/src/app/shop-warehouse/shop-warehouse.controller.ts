import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatShopWarehouseReqDto } from './dto/create-shop-warehouse-req.dto';
import { ShopWarehouseReq } from './schemas/shop-warehouse-req.schema';
import { ShopWarehouseService } from './shop-warehouse.service';

@Controller('shopWarehouseRequest')
export class ShopWarehouseController {
  constructor(private readonly shopWarehouseReqService: ShopWarehouseService) {}

  @Post('createRequest')
  createRequest(@Body() creatShopWarehouseReqDto: CreatShopWarehouseReqDto) {
    return this.shopWarehouseReqService.createRequest(creatShopWarehouseReqDto);
  }

  @Post('createMultipleRequests')
  createMultipleRequests(@Body() creatShopWarehouseReqsArr: CreatShopWarehouseReqDto[]) {
    return this.shopWarehouseReqService.createMultipleRequests(creatShopWarehouseReqsArr);
  }

  @Get('findAllByShopID/:id')
  findAllByShopID(@Param('id') id: string) {
    return this.shopWarehouseReqService.findAllByShopID(id);
  }

  @Get('findAllByWarehouseID/:id')
  findAllByWarehouseID(@Param('id') id: string) {
    return this.shopWarehouseReqService.findAllByWarehouseID(id);
  }

  @Get('delete/:id')
  delete(@Param('id') id: string) {
    return this.shopWarehouseReqService.delete(id);
  }

  @Get('update')
  update(@Body() shopWarehouseReq: any) {
    return this.shopWarehouseReqService.update(shopWarehouseReq._id, shopWarehouseReq);
  }

  @Get('findAllDev')
  findAllDev() {
    return this.shopWarehouseReqService.findAllDev();
  }
}
