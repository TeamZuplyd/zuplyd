import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Shop, ShopDocument } from "../schemas/shop.schema";

@Injectable()
export class ShopService {

    constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}
    
    async create(shop: Shop): Promise<Shop> {
        const newShop = new this.shopModel(shop);
        return newShop.save();
    }
    
    getData(): { message: string } {
        return { message: 'Welcome to shop!' };
    }
    
    async readAll(): Promise<Shop[]> {
        return await this.shopModel.find().exec();
    }

    async readById(id): Promise<Shop> {
        return await this.shopModel.findById(id).exec();
    }

    async readByLocation(location): Promise<Shop[]> {
        return await this.shopModel.find({location:location}).exec();
    }

    async readByCompany(company): Promise<Shop[]> {
        return await this.shopModel.find({company_id:company}).exec();
    }

    async readByManager(manager): Promise<Shop[]> {
        return await this.shopModel.find({manager_id:manager}).exec();
    }

    async update(id, shop: Shop): Promise<Shop> {
        return await this.shopModel.findByIdAndUpdate(id, shop, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.shopModel.findByIdAndRemove(id);
}

}
