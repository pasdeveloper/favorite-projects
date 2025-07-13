import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContributorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome del collaboratore',
    example: 'Mario Rossi',
    minLength: 1,
  })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email del collaboratore',
    example: 'mario.rossi@email.com',
    format: 'email',
  })
  email: string;
}
