import { Router, Request, Response } from 'express';
import { EmpService } from './emp.service/emp.service';
const ps = new EmpService();
export const emp = Router();
emp
.get('/', (req: Request, res: Response) => {
  ps.getAllEmp()
      .then(
      result => res.status(result.status).json(result.data).end(),
      error => res.status(error.status).json(error.data).end()
      );
})