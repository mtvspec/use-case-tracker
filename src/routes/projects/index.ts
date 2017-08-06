import { Router, Request, Response } from 'express';
import { ProjectsService } from './projects.service/projects.service';
const ps = new ProjectsService();

import { projectTeams } from './project-teams';

export const projects = Router();

projects.use('/:id/project-teams', projectTeams);

projects
  .get('/', (req: Request, res: Response) => {
    ps.getAllProjects()
      .then(
      result => res.status(result.status).json(result.data).end(),
      error => res.status(error.status).json(error.data).end()
      );
  })
  .post('/', (req: Request, res: Response) => {
    console.log(req.body);
    if (req.body) res.status(201).json({ id: 3 }).end();
  })