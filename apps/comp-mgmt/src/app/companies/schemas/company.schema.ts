import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  company_name: string;

  @Prop()
  address: string;

  @Prop([String])
  contact_nums: string[];

  @Prop()
  distribution_struct: number;

  @Prop()
  tier: number;

  @Prop([String])
  w_managers: string[];

  @Prop([String])
  s_managers: string[];

  @Prop([String])
  p_managers: string[];

  @Prop()
  init_completed: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
