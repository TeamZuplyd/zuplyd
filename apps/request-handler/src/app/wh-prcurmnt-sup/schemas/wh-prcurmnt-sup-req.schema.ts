import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Item {
  @Prop({ type: String, required: true, lowercase: true })
  _id: string;

  @Prop({ required: true })
  item_name: string;

  @Prop({ required: true })
  category_name: string;

  @Prop({ required: true })
  brand_name: string;
}

type itemDetails = { item_name: string; category_name: string; brand_name: string };

export type WhPrcurmntSupReqDocument = WhPrcurmntSupReq & Document;

@Schema()
export class WhPrcurmntSupReq {
  @Prop({ required: true })
  requiredQuantity: number;

  @Prop({ required: false })
  request: boolean;

  @Prop({ required: false })
  requested_by: string;

  @Prop({ required: true })
  requiredDate: string;

  @Prop({ required: false })
  required_by: string;

  @Prop({ required: false })
  assigned: boolean;

  @Prop({ required: false })
  priority: string;

  @Prop({ required: true })
  sentRequest: boolean;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  warehouse_id: string;

  @Prop({ required: true })
  company_id: string;

  @Prop({ required: true })
  company_name: string;

  @Prop()
  proc_id: string;

  @Prop({ required: true })
  suppliers: any[];

  // @Prop({ required: true, type: () => any })
  // item: { item_name: string; category_name: string; brand_name: string };
  @Prop({ required: true, type: Item })
  item: Item;
}

export const WhPrcurmntSupReqSchema = SchemaFactory.createForClass(WhPrcurmntSupReq);
