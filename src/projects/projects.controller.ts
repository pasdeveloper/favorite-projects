import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from './models/create-project.dto';
import { UpdateProjectDto } from './models/update-project.dto';
import { ProjectsService } from './projects.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('projects')
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

  @Post()
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
