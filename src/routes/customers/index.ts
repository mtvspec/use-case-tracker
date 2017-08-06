import { Router, Request, Response } from 'express';
import { CustomersService } from './customers.service/customers.service';
const cs = new CustomersService();

export const customers = Router();

customers
  .get('/', (req: Request, res: Response) => {
    cs.getAllCustomers()
      .then(
      result => res.status(result.status).json(result.data).end(),
      error => res.status(error.status).json(error.data).end()
      );
  })
  .post('/', (req: Request, res: Response) => {
    console.log(req.body);
    if (req.body) res.status(201).json({ id: 3 }).end();
  })