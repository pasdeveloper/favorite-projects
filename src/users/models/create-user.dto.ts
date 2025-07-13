import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxDate,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email dell'utente (deve essere univoca)",
    example: 'mario.rossi@email.com',
    format: 'email',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
  //   message:
  //     'Password must contain at least one lowercase letter, one uppercase letter and one number',
  // })
  @ApiProperty({
    description: "Password dell'utente (minimo 8 caratteri)",
    example: 'MySecurePassword123',
    minLength: 8,
    format: 'password',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Nome dell'utente",
    example: 'Mario',
    minLength: 1,
  })
  nome: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Cognome dell'utente",
    example: 'Rossi',
    minLength: 1,
  })
  cognome: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  @ApiProperty({
    description: "Data di nascita dell'utente (non può essere futura)",
    example: '1990-01-15',
    type: 'string',
    format: 'date',
  })
  dataNascita: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: "Città di nascita dell'utente",
    example: 'Roma',
    minLength: 1,
  })
  cittaNascita: string;
}
