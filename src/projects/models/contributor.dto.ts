import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContributorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
