import { Router, Request, Response } from 'express';
import { UserAuthentificationComponent } from './user-authentificate/user-authentificate.component';
import { UsersService } from './users.service/users.service';

const s = new UsersService();

export const users = Router();

users
  .get('/session', (req: Request, res: Response) => {
    s.getSessionByToken(req.cookies.session)
    .then(result => res.status(result.status).json(result.data).end())
    .catch(err => res.status(err.status).json(err.data).end());
  })
  .get('/logout/:id', (req: Request, res: Response) => {
    s.closeSession(req.params.id)
    .then(result => res.status(result.status).json(result.data).end())
    .catch(err => res.status(err.status).json(err.data).end());
  })
  .post('/authentificate', (req: Request, res: Response) => {
    UserAuthentificationComponent.authentificateUser(req.body)
      .then(result => res.status(200).cookie('session', result.data.aToken).end())
      .catch(error => res.status(401).end());
  })
  .get('/:username', (req: Request, res: Response) => {
    s.getUserByUsername(req.params.username)
    .then(result => res.status(result.status).json(result.data).end())
    .catch(err => res.status(err.status).json(err.data).end());
  })
  .get('/', (req: Request, res: Response) => {
    s.getAllUsers()
    .then(result => res.status(result.status).json(result.data).end())
    .catch(err => res.status(err.status).json(err.data).end());
  })