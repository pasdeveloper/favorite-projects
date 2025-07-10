import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

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
  // TODO: validazione data (non futura)
  dataNascita: Date;
  @IsNotEmpty()
  cittaNascita: string;
  @IsEnum(['USER', 'ADMIN'], { message: 'Unkown user role' })
  ruolo: 'USER' | 'ADMIN';
}
