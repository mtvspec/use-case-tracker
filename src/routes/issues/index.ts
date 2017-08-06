import { Router, Request, Response } from 'express';
import { IssuesService } from './issues.service/issues.service';
const s = new IssuesService();
export const issues = Router();

issues
  .get('/', (req: Request, res: Response) => {
    s.getAllIssues()
      .then(result => res.status(result.status).json(result.data).end())
      .catch(error => res.status(error.status).json(error.data).end());
  })
  .get('/:id', (req: Request, res: Response) => {
    s.getIssue(req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(error => res.status(error.status).json(error.data).end());
  })
  .post('/', (req: Request, res: Response) => {
    console.log(req.body)
    s.postIssue(req.body)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(error => res.status(error.status).json(error.data).end());
  })
  .put('/:id', (req: Request, res: Response) => {
    req.body.id = req.params.id;
    s.updateIssue(req.body)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(error => res.status(error.status).json(error.data).end());
  })
  .get('/close/:id', (req: Request, res: Response) => {
    s.closeIssue(req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(error => res.status(error.status).json(error.data).end());
  })
  .get('/open/:id', (req: Request, res: Response) => {
    s.openIssue(req.params.id)
      .then(result => res.status(result.status).json(result.data).end())
      .catch(error => res.status(error.status).json(error.data).end());
  })