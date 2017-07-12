import { Component, Input, OnInit } from '@angular/core';

import { Project } from './../project';


import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';


import { ProjectService } from './../project-service/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrls: [
    'project-detail.component.css'
  ]
})

export class ProjectDetailComponent implements OnInit {
  title = 'Project Detail Component';

  selectedProject: Project;

  @Input() project: Project;

  constructor(

    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit (): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.projectService.getProject(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  goBack (): void {
    this.location.back();
  }

}
