import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Warehouse, WarehouseDocument } from "../schemas/warehouse.schema";
import { StoreItem, StoreItemDocument } from "../schemas/storeitem.schema";
import { Shop, ShopDocument } from "../schemas/shop.schema";

@Injectable()
export class WarehouseService {

    constructor(@InjectModel(Warehouse.name) private warehouseModel: Model<WarehouseDocument>, @InjectModel(StoreItem.name) private storeitemModel: Model<StoreItemDocument>, @InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}
    
    async create(warehouse: Warehouse): Promise<Warehouse> {
        const newWarehouse = new this.warehouseModel(warehouse);
        return newWarehouse.save();
    }
    
    getData(): { message: string } {
        return { message: 'Welcome to warehouse!' };
    }
    
    async readAll(): Promise<Warehouse[]> {
        return await this.warehouseModel.find().exec();
    }

    async readById(id): Promise<Warehouse> {
        return await this.warehouseModel.findById(id).exec();
    }

    async readByLocation(location): Promise<Warehouse[]> {
        return await this.warehouseModel.find({location:location}).exec();
    }

    async readByCompany(company): Promise<Warehouse[]> {
        return await this.warehouseModel.find({company_id:company}).exec();
    }

    async readByManager(manager): Promise<Warehouse[]> {
        return await this.warehouseModel.find({manager_id:manager}).exec();
    }

    async update(id, warehouse: Warehouse): Promise<Warehouse> {
        return await this.warehouseModel.findByIdAndUpdate(id, warehouse, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.warehouseModel.findByIdAndRemove(id);
    }

    async assignShop(id, shop: {shop_id:string, shop_name:string}): Promise<Warehouse> {
        const warehouse = await this.warehouseModel.findById(id).exec();
        warehouse.assigned_shops.push(shop);
        
        const shopOther = await this.shopModel.findById(shop.shop_id).exec();
        shopOther.assigned_warehouses.push({warehouse_id:id, warehouse_name:warehouse.name});
        const newShopOther = await this.shopModel.findByIdAndUpdate(shop.shop_id, shopOther, {new: true})
        console.log(newShopOther);

        return await this.warehouseModel.findByIdAndUpdate(id, warehouse, {new: true})
    }

    async unAssignShop(id, shop_id): Promise<Warehouse> {
        const warehouse = await this.warehouseModel.findById(id).exec();
        const newShopList = warehouse.assigned_shops.filter(shop => shop.shop_id != shop_id);
        warehouse.assigned_shops = newShopList;

        const shop = await this.shopModel.findById(shop_id).exec();
        const newWarehouseList = shop.assigned_warehouses.filter(warehouseNew => warehouseNew.warehouse_id != id);
        shop.assigned_warehouses = newWarehouseList;
        this.shopModel.findByIdAndUpdate(shop_id, shop, {new: true})

        return await this.warehouseModel.findByIdAndUpdate(id, warehouse, {new: true})
    }

    //items
    async readAllItems(id): Promise<StoreItem[]> {
        return await this.storeitemModel.find({warehouse_id:id}).exec();
    }

    async createItem(storeitem: StoreItem): Promise<StoreItem> {
        const newStoreItem = new this.storeitemModel(storeitem);
        return newStoreItem.save();
    }

    async updateItem(id, storeitem: StoreItem): Promise<StoreItem> {
        return await this.storeitemModel.findByIdAndUpdate(id, storeitem, {new: true})
    }

    async deleteItem(id): Promise<any> {
        return await this.storeitemModel.findByIdAndRemove(id);
    }
}
