import { Router, Request, Response } from 'express';

const projects = Router();

projects
.get('/', (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200)
  .json([{ id: 1, name: 'My Project!', description: 'Description of my project' }]).end();
})

export default projects;