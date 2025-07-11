import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id: number;

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
