import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopWarehouseReqDocument = ShopWarehouseReq & Document;

@Schema()
export class ShopWarehouseReq {
  @Prop()
  brand: string;

  @Prop({ required: true })
  item_code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  request: boolean;

  @Prop({ required: true })
  requested_by: string;

  @Prop({ required: true })
  requested_date: string;

  @Prop()
  required_by: string;

  @Prop({ required: true })
  sentRequest: boolean;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  warehouse_id: string;

  @Prop({ required: true })
  company_id: string;
}

export const ShopWarehouseReqSchema = SchemaFactory.createForClass(ShopWarehouseReq);
