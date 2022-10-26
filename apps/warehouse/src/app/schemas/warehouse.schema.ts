import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type WarehouseDocument = Warehouse & Document;

@Schema()
export class Warehouse {

    @Prop()
    company_id: string;

    @Prop()
    name: string;

    @Prop()
    location: string;

    @Prop()
    manager_id: string;

    @Prop()
    contact_no: string[];

    @Prop()
    address: string;

    @Prop()
    assigned_shops: {shop_id:string, shop_name:string}[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);