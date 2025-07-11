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

export class CreateProjectDto {
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descrizione?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  linguaggi?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  numeroCommit?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  numeroStelle?: number;

  @Type(() => ContributorDto)
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  collaboratori: ContributorDto[];
}
