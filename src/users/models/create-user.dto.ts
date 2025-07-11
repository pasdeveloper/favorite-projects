import { IsDate, IsEmail, IsNotEmpty, MaxDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
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
