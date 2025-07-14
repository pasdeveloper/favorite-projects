import { Expose, Transform } from 'class-transformer';
import { UserDocument } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @Transform(({ obj }: { obj: UserDocument }) => obj._id.toString())
  @ApiProperty({ description: 'ID utente (MongoDB ObjectId)' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'email utente' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'nome utente' })
  nome: string;

  @Expose()
  @ApiProperty({ description: 'cognome utente' })
  cognome: string;

  @Expose()
  @ApiProperty({
    description: 'data nascita utente',
    type: String,
    format: 'date-time',
  })
  dataNascita: Date;

  @Expose()
  @ApiProperty({ description: 'città nascita utente' })
  cittaNascita: string;
}
