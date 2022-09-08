import { Controller, Get } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('addItem')
  addItem() {
    const itemType = {
      _id: '62f9057a3eebc104e8dc79d3',
      item_name: 'choco',
      company_id: 'acdf214124',
      company_name: 'jadoija',
      unitOfMeasure: 'kilogram',
      output_rule: 'exp_date',
      output_rule_unit: 'date',
      output_rule_type: 'minFirst',
      attributes_array: ['batch_no', 'exp_date', 'MFD'],
    };

    const itemDetails = {
      batch_no: '5555',
      exp_date: '14.02.2023',
      MFD: '14.02.2019',
    };

    const ownerId = 'ada';
    const qty = 1000;

    return this.goodsService.addItem(ownerId, qty, itemType.item_name, itemType, itemDetails);
  }

  @Get('transferGoods')
  transferGoods() {
    const itemType = {
      _id: '62f9057a3eebc104e8dc79d3',
      item_name: 'choco',
      company_id: 'acdf214124',
      company_name: 'jadoija',
      output_rule: 'exp_date',
      output_rule_unit: 'date',
      output_rule_type: 'minFirst',
      attributes_array: ['batch_no', 'exp_date', 'MFD'],
    };

    let item = {};

    // return this.goodsService.itemTransfer(item, 'bbbbbbbb', 100, itemType);

    const transferQty = 100;
    const itemArr = this.goodsService.itemToBeReleased(item, itemType);

    return itemArr.then((res) => {
      if (itemType.output_rule_type == 'minFirst') {
        res.sort(this.GetSortOrderMin(itemType.output_rule));
      } else {
        res.sort(this.GetSortOrderMax(itemType.output_rule));
      }
      item = res[0];
      return this.goodsService.itemTransfer(item, 'bbbbbbbb', transferQty, itemType);
    });
  }

  @Get('releaseGoods')
  releaseGoods() {
    const itemType = {
      _id: '62f9057a3eebc104e8dc79d3',
      item_name: 'choco',
      company_id: 'acdf214124',
      company_name: 'jadoija',
      output_rule: 'exp_date',
      output_rule_unit: 'date',
      output_rule_type: 'minFirst',
      attributes_array: ['batch_no', 'exp_date', 'MFD'],
    };

    let item = {};

    const releaseQty = 100;
    const itemArr = this.goodsService.itemToBeReleased(item, itemType);

    return itemArr.then((res) => {
      if (itemType.output_rule_type == 'minFirst') {
        res.sort(this.GetSortOrderMin(itemType.output_rule));
      } else {
        res.sort(this.GetSortOrderMax(itemType.output_rule));
      }
      item = res[0];
      return this.goodsService.itemRelease(item, releaseQty, itemType);
    });
    // return this.goodsService.itemRelease(item, releaseQty, itemType);
  }

  GetSortOrderMax(prop: string) {
    return function (a: string, b: string) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  GetSortOrderMin(prop: string) {
    return function (a: string, b: string) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
}
