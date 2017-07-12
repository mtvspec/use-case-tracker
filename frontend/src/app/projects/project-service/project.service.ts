import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Project } from './../project';
import { PROJECTS } from './mock-projects';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {
  public projects: Project[];
  private url = 'http://use-case-tracker.org/api/projects';
  constructor(private http: Http) {}
  getProjects(): Promise<Project[]> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response.json() as Project[])
    .catch(this.handleError)
  }
  getProject(id: number): Promise<Project> {
    return this.getProjects()
    .then(projects => projects.find(project => project.id === id))
    .catch(err => console.error(err));
  }

  private handleError(error: any) {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

}
