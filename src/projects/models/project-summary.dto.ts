import { Expose, Transform } from 'class-transformer';
import { ProjectDocument } from '../schemas/project.schema';

export class ProjectSummaryDto {
  @Expose()
  @Transform(({ obj }: { obj: ProjectDocument }) => obj._id.toString())
  id: string;

  @Expose()
  nome: string;

  @Expose()
  descrizione?: string;

  @Expose()
  tags: string[];
}
