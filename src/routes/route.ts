import { Request, Response } from 'express';

export class BaseRoute {
  protected title: string;

  constructor() {
    this.title = 'Title';
  }

  public response (req: Request, res: Response) {
    console.log(req);
    res.send(this.title);
  };

}