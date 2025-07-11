import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from './models/create-project.dto';
import { UpdateProjectDto } from './models/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProject(id);
  }

  @Get()
  getAllProjects(
    @Query('tag') tag?: string,
    @Query('linguaggio') linguaggio?: string,
  ) {
    return this.projectsService.getAllProjects({ tag, linguaggio });
  }

  @Post()
  createProject(@Body(ValidationPipe) createProject: CreateProjectDto) {
    return this.projectsService.createProject(createProject);
  }

  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProject: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, updateProject);
  }
}
