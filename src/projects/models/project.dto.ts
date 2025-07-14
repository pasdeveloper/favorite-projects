import { ContributorDto } from './contributor.dto';
import { Expose, Transform } from 'class-transformer';
import { ProjectDocument } from '../schemas/project.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @Expose()
  @Transform(({ obj }: { obj: ProjectDocument }) => obj._id.toString())
  @ApiProperty({ description: 'ID progetto (MongoDB ObjectId)' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'nome progetto' })
  nome: string;

  @Expose()
  @ApiProperty({ description: 'descrizione progetto' })
  descrizione?: string;

  @Expose()
  @ApiProperty({ description: 'linguaggi progetto' })
  linguaggi: string[];

  @Expose()
  @ApiProperty({ description: 'tags progetto' })
  tags: string[];

  @Expose()
  @ApiProperty({ description: 'numero commit progetto' })
  numeroCommit: number;

  @Expose()
  @ApiProperty({ description: 'numero stelle progetto' })
  numeroStelle: number;

  @Expose()
  @ApiProperty({
    type: [ContributorDto],
    description: 'elenco collaboratori progetto',
  })
  collaboratori: ContributorDto[];
}
