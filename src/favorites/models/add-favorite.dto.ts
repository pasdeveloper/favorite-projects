import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'ID del progetto da aggiungere ai preferiti (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439013',
    minLength: 1,
  })
  projectId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty({
    description:
      'Descrizione personale del motivo per cui il progetto è stato aggiunto ai preferiti',
    example: 'Progetto molto interessante per imparare NestJS',
    maxLength: 500,
    minLength: 1,
  })
  description: string;
}
