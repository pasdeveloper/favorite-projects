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

@Controller('projects')
@UseGuards(RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  getProject(@Param('id', ParseObjectIdPipe) id: string) {
    return this.projectsService.getProject(id);
  }

  @Get()
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
  createProject(@Body(ValidationPipe) createProject: CreateProjectDto) {
    return this.projectsService.createProject(createProject);
  }

  @Patch(':id')
  updateProject(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(ValidationPipe) updateProject: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, updateProject);
  }
}
