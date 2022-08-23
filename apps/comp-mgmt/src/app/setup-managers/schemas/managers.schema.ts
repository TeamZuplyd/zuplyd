import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManagersDocument = Managers & Document;

@Schema()
export class Managers {
  @Prop()
  company_id: string;

  @Prop([String])
  w_managers: string[];

  @Prop([String])
  s_managers: string[];

  @Prop([String])
  p_managers: string[];
}

export const ManagersSchema = SchemaFactory.createForClass(Managers);
