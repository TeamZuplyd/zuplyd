import { Controller, Get } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('test/getData')
  getData() {
    const itemType = {
      _id: '62f9057a3eebc104e8dc79d3',
      item_name: 'choco',
      company_id: 'acdf214124',
      company_name: 'jadoija',
      attributes_array: ['batch_no', 'exp_date', 'MFD'],
    };

    const itemDetails = {
      batch_no: '14213',
      exp_date: '14.02.2023',
      MFD: '14.02.2019',
    };

    const ownerId = 'ada';
    const qty = 100;
    const unitOfMeasure = 'kilogram';

    return this.goodsService.addItem(ownerId, qty, unitOfMeasure, itemType.item_name, itemType, itemDetails);
  }
}
