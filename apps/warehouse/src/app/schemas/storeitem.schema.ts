import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StoreItemDocument = StoreItem & Document;

@Schema()
export class StoreItem {

    @Prop()
    item_code: string;

    @Prop()
    warehouse_id: string;

    @Prop()
    item_name: string;

    @Prop()
    min: number;

    @Prop()
    max: number;
}

export const StoreItemSchema = SchemaFactory.createForClass(StoreItem);