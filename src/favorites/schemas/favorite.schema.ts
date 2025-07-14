import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ toJSON: { versionKey: false } })
export class Favorite {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ required: true, maxlength: 500 })
  description: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

export type FavoriteDocument = Favorite & Document;
