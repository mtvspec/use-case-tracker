import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './../project';

import { ProjectService } from './../project-service/project.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
  title = 'Project List';

  projects: Project[];

  selectedProject: Project;

  constructor(
    private router: Router,
    private projectService: ProjectService
    ) { };

  onSelect (project: Project) {
    this.selectedProject = project;
  }

  gotoDetail (): void {
    this.router.navigate(['/detail', this.selectedProject.id]);
  }

  getProjects (): void {
    this.projectService.getProjects().then(projects => {
      this.projects = projects
    }).catch(err => console.error(err));
  }

  ngOnInit (): void {
    this.getProjects();
  }

}
