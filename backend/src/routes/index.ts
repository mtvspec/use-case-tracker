import { Request, Response, NextFunction, Router } from 'express';

import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {
  public static create(router: Router ) {
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }
 
  constructor(){
    super();
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.title = 'Index';

    this.response(req, res);
    next();
  }

}