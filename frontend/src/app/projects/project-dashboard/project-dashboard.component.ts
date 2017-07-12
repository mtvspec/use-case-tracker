import { Component, OnInit } from '@angular/core';

import { Project } from './../project';
import { ProjectService } from './../project-service/project.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: 'project-dashboard.component.html',
  styleUrls: [
    'project-dashboard.component.css'
  ]
})

export class ProjectDashboardComponent implements OnInit {
  title: 'Project Dashboard';

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {};

  ngOnInit(): void {
    this.projectService.getProjects()
    .then(projects => {
      console.log(projects);
      this.projects = projects;
    })
    .catch(err => console.error(err));
  }

}
