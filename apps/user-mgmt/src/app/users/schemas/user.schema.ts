import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    company_name: string;

    @Prop({ required: true })
    company_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
