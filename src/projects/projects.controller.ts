import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from './models/create-project.dto';
import { UpdateProjectDto } from './models/update-project.dto';
import { ProjectsService } from './projects.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MapToDto } from '../core/decorators/map-to-dto.decorator';
import { ProjectDto } from './models/project.dto';
import { ProjectSummaryDto } from './models/project-summary.dto';

@Controller('projects')
@UseGuards(RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  @MapToDto(ProjectDto)
  @ApiOperation({
    summary: 'Ottieni un progetto specifico',
    description: 'Recupera i dettagli di un progetto utilizzando il suo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del progetto (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  getProject(@Param('id', ParseObjectIdPipe) id: string) {
    return this.projectsService.getProject(id);
  }

  @Get()
  @MapToDto(ProjectSummaryDto)
  @ApiOperation({
    summary: 'Ottieni tutti i progetti',
    description: 'Recupera una lista di tutti i progetti con filtri opzionali',
  })
  @ApiQuery({
    name: 'tag',
    required: false,
    description: 'Filtra i progetti per tag',
    example: 'web',
  })
  @ApiQuery({
    name: 'linguaggio',
    required: false,
    description: 'Filtra i progetti per linguaggio di programmazione',
    example: 'JavaScript',
  })
  @ApiQuery({
    name: 'nome',
    required: false,
    description: 'Filtra i progetti per nome (ricerca parziale)',
    example: 'api',
  })
  getAllProjects(
    @Query('tag') tag?: string,
    @Query('linguaggio') linguaggio?: string,
    @Query('nome') nomeLike?: string,
  ) {
    return this.projectsService.getAllProjects({ tag, linguaggio, nomeLike });
  }

  //TODO: utente corrente conta come collaboratore?
  @Post()
  @RequiredRoles('ADMIN')
  @MapToDto(ProjectDto)
  @ApiOperation({
    summary: 'Crea un nuovo progetto',
    description: 'Crea un nuovo progetto. Richiede ruolo ADMIN.',
  })
  @ApiBody({
    type: CreateProjectDto,
    description: 'Dati per la creazione del progetto',
  })
  createProject(@Body(ValidationPipe) createProject: CreateProjectDto) {
    return this.projectsService.createProject(createProject);
  }

  @Patch(':id')
  @MapToDto(ProjectDto)
  @ApiOperation({
    summary: 'Aggiorna un progetto esistente',
    description: 'Aggiorna parzialmente i dati di un progetto esistente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del progetto da aggiornare',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({
    type: UpdateProjectDto,
    description: "Dati per l'aggiornamento del progetto",
  })
  updateProject(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(ValidationPipe) updateProject: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, updateProject);
  }
}
