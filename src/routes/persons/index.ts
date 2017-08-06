import { Router, Request, Response } from 'express';
import { PersonsService } from './persons.service/persons.service';

import * as validator from 'indicative';

const ps = new PersonsService();
export const persons = Router();

persons
  .get('/', (req: Request, res: Response) => {
    ps.getAllPersons()
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
  .get('/:id', (req: Request, res: Response) => {
    ps.getPerson(req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })
  .post('/', (req: Request, res: Response) => {
    const personData = req.body;
    const pattern = {
      iin: 'string',
      lastName: 'string',
      firstName: 'string|required',
      middleName: 'string'
    }
    
    ps.createPerson(req.body)
    .then(result => res.status(result.status).json(result.data).end())
    .catch(err => res.status(err.status).json(err.data).end());
  })
  .put('/:id', (req: Request, res: Response) => {
    req.body.id = req.params.id;
    ps.updatePerson(req.body)
    .then(result => res.status(result.status).json(result.data).end())
    .catch(err => res.status(err.status).json(err.data).end());
  })
  .delete('/:id', (req: Request, res: Response) => {
    ps.deletePerson(req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(err => res.status(err.status).json(err.data).end());
  })