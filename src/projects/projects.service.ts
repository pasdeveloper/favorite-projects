import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects: object[] = [];

  getProject(id: number) {
    const project = this.projects.find((p) => p['id'] == id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  getAllProjects(filters: { tag?: string; linguaggio?: string }) {
    let projects = this.projects;
    if (filters.tag) {
      projects = projects.filter((p) =>
        (p['tags'] as string[])?.includes(filters.tag!),
      );
    }
    if (filters.linguaggio) {
      projects = projects.filter((p) =>
        (p['linguaggi'] as string[])?.includes(filters.linguaggio!),
      );
    }
    if (projects.length == 0) {
      throw new NotFoundException('No projects found');
    }
    return projects;
  }

  createProject(createProject: {}) {
    const lastId =
      this.projects.length == 0
        ? 0
        : this.projects[this.projects.length - 1]['id'];
    const newProject = { ...createProject, id: lastId + 1 };
    this.projects.push(newProject);
    return newProject;
  }

  updateProject(id: number, updateProject: {}) {
    const existingProject = this.projects.find((p) => p['id'] == id);
    if (!existingProject) {
      throw new NotFoundException('Project not found');
    }
    const existingProjectIndex = this.projects.indexOf(existingProject);
    const updatedProject = { ...existingProject, ...updateProject };
    this.projects[existingProjectIndex] = updatedProject;
  }
}
