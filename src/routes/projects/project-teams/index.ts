import { Router, Request, Response } from 'express';

import { projectMembers } from './project-members';

import { ProjectTeamsService } from './project-teams.service';

const ps = new ProjectTeamsService();

export const projectTeams = Router({ mergeParams: true });

projectTeams.use('/:id/project-members', projectMembers);

projectTeams
  .get('/', (req: Request, res: Response) => {
    ps.getAllProjectTeams(+req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
