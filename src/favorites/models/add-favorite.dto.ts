import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddFavoriteDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;
}
