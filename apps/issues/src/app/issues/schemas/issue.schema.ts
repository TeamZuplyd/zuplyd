import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IssueDocument = IssueClass & Document;

@Schema()
export class IssueClass {
  @Prop()
  company_id: string;

  @Prop()
  user_id: string;

  @Prop()
  item_name: string;

  @Prop()
  batch_no: string;

  @Prop()
  desc: string;

  @Prop()
  action_taken: string;

  @Prop()
  action_desc: string;

  @Prop()
  flag: number;
}

export const IssueSchema = SchemaFactory.createForClass(IssueClass);
