import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContributorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome del collaboratore',
    minLength: 1,
  })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email del collaboratore',
    format: 'email',
  })
  email: string;
}
