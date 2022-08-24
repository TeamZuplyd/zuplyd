import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  item_name: string;

  @Prop()
  category_name: string;

  @Prop()
  brand_name: string;

  @Prop()
  min_release_quantity: number;

  @Prop()
  output_rule: string;

  @Prop()
  output_rule_unit: string;

  @Prop()
  company_id: string;

  @Prop()
  company_name: string;

  @Prop()
  min_release_quantity_unit: string;

  @Prop([String])
  attributes_array: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
