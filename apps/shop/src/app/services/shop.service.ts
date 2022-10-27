import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Shop, ShopDocument } from "../schemas/shop.schema";
import { StoreItem, StoreItemDocument } from "../schemas/storeitem.schema";

@Injectable()
export class ShopService {

    constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>, @InjectModel(StoreItem.name) private storeitemModel: Model<StoreItemDocument>) {}
    
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

    async assignWarehouse(id, warehouse: {warehouse_id:string, warehouse_name:string}): Promise<Shop> {
        const shop = await this.shopModel.findById(id).exec();
        shop.assigned_warehouses.push(warehouse);
        return await this.shopModel.findByIdAndUpdate(id, shop, {new: true})
    }

    async unAssignWarehouse(id, warehouse_id): Promise<Shop> {
        const shop = await this.shopModel.findById(id).exec();
        const newWarehouseList = shop.assigned_warehouses.filter(warehouse => warehouse.warehouse_id != warehouse_id);
        shop.assigned_warehouses = newWarehouseList;
        return await this.shopModel.findByIdAndUpdate(id, shop, {new: true})
    }

    //items
    async readAllItems(id): Promise<StoreItem[]> {
        return await this.storeitemModel.find({shop_id:id}).exec();
    }

    async createItem(storeitem: StoreItem): Promise<StoreItem> {
        const newStoreItem = new this.storeitemModel(storeitem);
        return newStoreItem.save();
    }

    async updateItem(id, storeitem: StoreItem): Promise<StoreItem> {
        return await this.storeitemModel.findOneAndUpdate({item_code:id}, storeitem, {new: true})
    }

    async deleteItem(id): Promise<any> {
        return await this.storeitemModel.findByIdAndRemove(id);
    }

}
