import { Expose, Transform } from 'class-transformer';
import { UserDocument } from '../schemas/user.schema';

export class UserDto {
  @Expose()
  @Transform(({ obj }: { obj: UserDocument }) => obj._id.toString())
  id: string;

  @Expose()
  email: string;

  @Expose()
  nome: string;

  @Expose()
  cognome: string;

  @Expose()
  dataNascita: Date;

  @Expose()
  cittaNascita: string;
}
