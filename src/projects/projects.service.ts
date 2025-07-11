import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './models/create-project.dto';
import { UpdateProjectDto } from './models/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async getProject(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  getAllProjects(filters: {
    tag?: string;
    linguaggio?: string;
    nomeLike?: string;
  }) {
    const query: Record<string, any> = {};

    if (filters.tag) {
      query.tags = filters.tag;
    }

    if (filters.linguaggio) {
      query.linguaggi = filters.linguaggio;
    }

    if (filters.nomeLike) {
      query.nome = { $regex: filters.nomeLike, $options: 'i' };
    }

    return this.projectModel.find(query).exec();
  }

  createProject(createProject: CreateProjectDto) {
    const newProject = new this.projectModel(createProject);
    return newProject.save();
  }

  async updateProject(id: string, updateProject: UpdateProjectDto) {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      id,
      updateProject,
      { new: true },
    );
    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }
    return updatedProject;
  }
}
