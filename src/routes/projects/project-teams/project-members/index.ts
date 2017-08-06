import { Router, Request, Response } from 'express';

import { ProjectMembersService } from './project-members.service';

const ps = new ProjectMembersService();

export const projectMembers = Router({ mergeParams: true });

projectMembers
  .get('/', (req: Request, res: Response) => {
    ps.getAllProjectMembers(+req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
  .get('/:id', (req: Request, res: Response) => {
    ps.getProjectMember(+req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
