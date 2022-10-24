import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Warehouse, WarehouseDocument } from "../schemas/warehouse.schema";

@Injectable()
export class WarehouseService {

    constructor(@InjectModel(Warehouse.name) private warehouseModel: Model<WarehouseDocument>) {}
    
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

}
