import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemCategoryDocument = itemCategory & Document;

@Schema()
export class itemCategory {
  @Prop({ required: true })
  company_id: string;

  @Prop({ required: true })
  categoryArr: string[];
}

export const itemCategorySchema = SchemaFactory.createForClass(itemCategory);
