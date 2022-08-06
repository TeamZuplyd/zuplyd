import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  distribution_struct: number;

  @Prop()
  tier: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
