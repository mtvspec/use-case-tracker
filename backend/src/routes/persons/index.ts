import { Router, Request, Response } from 'express';

const persons = Router();

persons
.get('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ hello: 'world!' });
})

export default persons;