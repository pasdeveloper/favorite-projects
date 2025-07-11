import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  nome: string;
  @IsNotEmpty()
  descrizione: string;
  linguaggi: string[];
  tags: string[];
  @IsNumber() //TODO: >= 0
  numeroCommit: number;
  @IsNumber() //TODO: >= 0
  numeroStelle: number;
  collaboratori: string[]; //TODO: nome + email
}
