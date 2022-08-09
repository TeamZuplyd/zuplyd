import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  item_name: string;

  @Prop()
  company_id: string;

  @Prop()
  company_name: string;

  @Prop([String])
  attributes_array: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
