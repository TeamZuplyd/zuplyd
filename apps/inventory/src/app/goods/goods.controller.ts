import { Body, Controller, Get, Param } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('addItem')
  addItem(@Body() addItemDto: any) {
    /*
    addItemDto structure that should be sent form the frontend

    addItemDto = {
      itemType: {nested obj} - itemTypeFromProcurement (createItemTypeDto)
      itemDetails: {nested obj} - key value pair for the attributes_array in item type (see below)
      ownerId: string
      qty: number
    }
    
    see below for reference

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
    */

    return this.goodsService.addItem(addItemDto.ownerId, addItemDto.qty, addItemDto.itemType.item_name, addItemDto.itemType, addItemDto.itemDetails);
  }

  @Get('transferGoods')
  transferGoods(@Body() transferGoodsDto: any) {
    /*
    transferGoodsDto structure that should be sent form the frontend

    transferGoodsDto = {
      itemType: {nested obj} - itemTypeFromProcurement (createItemTypeDto)
      transferQty: number
      transferToEntity: string
      transferFromEntity: string
    }
    

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

    // return this.goodsService.itemTransfer(item, 'bbbbbbbb', 100, itemType);

    const transferQty = 100;
    */
    // let item = {};
    // const itemArr = this.goodsService.itemToBeReleased(item, transferGoodsDto.itemType);
    // return itemArr.then((res) => {
    //   if (transferGoodsDto.itemType.output_rule_type == 'minFirst') {
    //     res.sort(this.GetSortOrderMin(transferGoodsDto.itemType.output_rule));
    //   } else {
    //     res.sort(this.GetSortOrderMax(transferGoodsDto.itemType.output_rule));
    //   }
    //   item = res[0];
    //   return this.goodsService.itemTransfer(item, transferGoodsDto.transferToEntity, transferGoodsDto.transferQty, transferGoodsDto.itemType);
    // });
    return this.goodsService.itemTransfer(transferGoodsDto.transferFromEntity, transferGoodsDto.transferToEntity, transferGoodsDto.transferQty, transferGoodsDto.itemType);
  }

  @Get('releaseGoods')
  releaseGoods(@Body() releaseGoodsDto: any) {
    /*
    releaseGoodsDto structure that should be sent form the frontend

    releaseGoodsDto = {
      itemType: {nested obj} - itemTypeFromProcurement (createItemTypeDto)
      releaseQty: number
      releaseFromEntity: string
    }

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

    const releaseQty = 100;
    */
    // let item = {};
    // const itemArr = this.goodsService.itemToBeReleased(item, releaseGoodsDto.itemType);
    // return itemArr.then((res) => {
    //   if (releaseGoodsDto.itemType.output_rule_type == 'minFirst') {
    //     res.sort(this.GetSortOrderMin(releaseGoodsDto.itemType.output_rule));
    //   } else {
    //     res.sort(this.GetSortOrderMax(releaseGoodsDto.itemType.output_rule));
    //   }
    //   item = res[0];
    //   return this.goodsService.itemRelease(item, releaseGoodsDto.releaseQty, releaseGoodsDto.itemType);
    // });
    return this.goodsService.itemRelease(releaseGoodsDto.releaseFromEntity, releaseGoodsDto.releaseQty, releaseGoodsDto.itemType);
    // return this.goodsService.itemRelease(item, releaseQty, releaseGoodsDto.itemType);
  }

  @Get('getItemStock')
  async getItemStock(@Body() itemTypeDto: any) {
    /*
    releaseGoodsDto = {
      itemType: {nested obj} - itemTypeFromProcurement (createItemTypeDto)
      ownerId: string
    }
    */

    const itemsArray = await this.goodsService.getItemsOfAnOwner(itemTypeDto.itemType, itemTypeDto.ownerId);

    let totalStock = 0;

    itemsArray.forEach((val) => {
      totalStock += val.qty;
    });

    return { totalStock: totalStock };
    /*returns the following
      {
        "totalStock": 1110
      }
    */
  }

  @Get('allBatchNosOfItem')
  async getItemBatcheNos(@Body() itemTypeDto: any) {
    /*
    releaseGoodsDto = {
      itemType: {nested obj} - itemTypeFromProcurement (createItemTypeDto)
      ownerId: string
    }
    */

    const itemsArray = await this.goodsService.getItemsOfAnOwner(itemTypeDto.itemType, itemTypeDto.ownerId);

    let batchNo = [];

    itemsArray.forEach((val) => {
      batchNo.push(val.batch_no);
    });

    let batchNosSet = new Set(batchNo);

    let batchNosFinal = [];

    batchNosSet.forEach((val) => {
      batchNosFinal.push(val);
    });

    return { batchNos: batchNosFinal };

    /*returns the following
      {
      "batchNos": [
        "5555",
        "14213"
        ]
      }
    */
  }
}
