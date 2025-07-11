import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxDate,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
  //   message:
  //     'Password must contain at least one lowercase letter, one uppercase letter and one number',
  // })
  password: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cognome: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  dataNascita: Date;

  @IsNotEmpty()
  cittaNascita: string;
}
