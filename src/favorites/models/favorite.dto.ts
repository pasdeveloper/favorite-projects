import { Expose, Transform } from 'class-transformer';
import { FavoriteDocument } from '../schemas/favorite.schema';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteDto {
  @Expose()
  @Transform(({ obj }: { obj: FavoriteDocument }) => obj._id.toString())
  @ApiProperty({ description: 'ID preferito (MongoDB ObjectId)' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'ID progetto (MongoDB ObjectId)' })
  projectId: string;

  @Expose()
  @ApiProperty({ description: 'motivo del preferito' })
  description: string;
}
