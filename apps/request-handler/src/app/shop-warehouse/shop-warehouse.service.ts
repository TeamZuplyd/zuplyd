import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatShopWarehouseReqDto } from './dto/create-shop-warehouse-req.dto';
import { ShopWarehouseReq, ShopWarehouseReqDocument } from './schemas/shop-warehouse-req.schema';

@Injectable()
export class ShopWarehouseService {
  constructor(@InjectModel(ShopWarehouseReq.name) private shopWarehouseReqModel: Model<ShopWarehouseReqDocument>) {}

  async createRequest(creatShopWarehouseReqDto: CreatShopWarehouseReqDto): Promise<ShopWarehouseReq> {
    const createdRequest = await this.shopWarehouseReqModel.create(creatShopWarehouseReqDto);
    return createdRequest;
  }

  async createMultipleRequests(creatShopWarehouseReqsArr: CreatShopWarehouseReqDto[]): Promise<any> {
    const createdRequest = await this.shopWarehouseReqModel.insertMany(creatShopWarehouseReqsArr);
    return createdRequest;
  }

  async findAllByShopID(shop_id: string): Promise<ShopWarehouseReq[]> {
    return this.shopWarehouseReqModel.find({ requested_by: shop_id }).exec();
  }

  async findAllByWarehouseID(warehouse_id: string): Promise<ShopWarehouseReq[]> {
    return this.shopWarehouseReqModel.find({ warehouse_id: warehouse_id }).exec();
  }

  async delete(id: string) {
    const deletedShopWarehouseReq = await this.shopWarehouseReqModel.findOneAndRemove({ _id: id }).exec();
    return deletedShopWarehouseReq;
  }

  async update(id: string, shopWarehouseReq: ShopWarehouseReq): Promise<ShopWarehouseReq> {
    return await this.shopWarehouseReqModel.findByIdAndUpdate(id, shopWarehouseReq, {
      returnOriginal: false,
    });
  }

  async findAllDev(): Promise<ShopWarehouseReq[]> {
    return this.shopWarehouseReqModel.find().exec();
  }
}
