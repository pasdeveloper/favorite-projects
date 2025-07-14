import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { FavoriteDocument } from '../schemas/favorite.schema';

export class FavoriteDto {
  @Expose()
  @Transform(({ obj }: { obj: FavoriteDocument }) => obj._id.toString())
  id: string;

  @Expose()
  projectId: Types.ObjectId;

  @Expose()
  description: string;
}
