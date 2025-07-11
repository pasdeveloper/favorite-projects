import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ toJSON: { versionKey: false } })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cognome: string;

  @Prop({ required: true })
  dataNascita: Date;

  @Prop({ required: true })
  cittaNascita: string;

  @Prop({ required: true })
  ruolo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
