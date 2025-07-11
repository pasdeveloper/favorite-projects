import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ContributorDto } from '../models/contributor.dto';

@Schema({ toJSON: { versionKey: false } })
export class Project {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nome: string;

  @Prop()
  descrizione?: string;

  @Prop({ type: [String], default: [] })
  linguaggi: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  numeroCommit: number;

  @Prop({ default: 0 })
  numeroStelle: number;

  @Prop({ type: [{ nome: String, email: String, _id: false }], default: [] })
  collaboratori: ContributorDto[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
