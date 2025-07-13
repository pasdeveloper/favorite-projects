import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ContributorDto } from './contributor.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome del progetto',
    example: 'Il mio progetto',
    minLength: 1,
  })
  nome: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Descrizione del progetto',
    example: 'Questo è un progetto web realizzato con NestJS',
  })
  descrizione?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Lista dei linguaggi utilizzati',
    example: ['JavaScript', 'TypeScript', 'Python'],
    type: [String],
  })
  linguaggi?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Lista dei tag del progetto',
    example: ['web', 'api', 'database', 'fullstack'],
    type: [String],
  })
  tags?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Numero totale di commit nel progetto',
    example: 150,
    minimum: 0,
  })
  numeroCommit?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Numero totale di stelle del progetto',
    example: 25,
    minimum: 0,
  })
  numeroStelle?: number;

  @Type(() => ContributorDto)
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiPropertyOptional({
    description: 'Lista dei collaboratori del progetto',
    type: [ContributorDto],
    example: [
      {
        nome: 'Mario Rossi',
        email: 'mario.rossi@email.com',
      },
      {
        nome: 'Luigi Bianchi',
        email: 'luigi.bianchi@email.com',
      },
    ],
  })
  collaboratori: ContributorDto[];
}
