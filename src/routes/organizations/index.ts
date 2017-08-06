import { Router, Request, Response } from 'express';

import { OrganizationsService } from './organizations.service';

const os = new OrganizationsService();

export const organizations = Router();

organizations
  .get('/', (req: Request, res: Response) => {
    os.getAllOrganizations()
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
  .get('/:id', (req: Request, res: Response) => {
    os.getOrganization(+req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
  .post('/', (req: Request, res: Response) => {
    os.createOrganization(req.body)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })