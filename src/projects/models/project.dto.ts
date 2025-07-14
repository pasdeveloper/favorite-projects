import { ContributorDto } from './contributor.dto';
import { Expose, Transform } from 'class-transformer';
import { ProjectDocument } from '../schemas/project.schema';

export class ProjectDto {
  @Expose()
  @Transform(({ obj }: { obj: ProjectDocument }) => obj._id.toString())
  id: string;

  @Expose()
  nome: string;

  @Expose()
  descrizione?: string;

  @Expose()
  linguaggi: string[];

  @Expose()
  tags: string[];

  @Expose()
  numeroCommit: number;

  @Expose()
  numeroStelle: number;

  @Expose()
  collaboratori: ContributorDto[];
}
