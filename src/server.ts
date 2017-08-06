import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorHandler');
import methodOverride = require('method-override');

import { users } from './routes/users';
import { persons } from './routes/persons';
import { organizations } from './routes/organizations';
import { issues } from './routes/issues';
import { emp } from './routes/emp';
import { customers } from './routes/customers';
import { projects } from './routes/projects';

import { IndexRoute } from "./routes/index";

export class Server {

  public app: express.Application;



  public static bootstrap (): Server {
    return new Server();
  }

  constructor() {


    this.app = express();

    this.config();

    this.requestInterceptor();

    this.api();

    this.routes();

  }

  public config () {
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser('secret'));
    //catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    this.app.use(errorHandler());
  }

  public requestInterceptor () {
    this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction): void {
      next();    
    })
  }

  public api () {
    this.app.use('/api/users/', users);
    this.app.use('/api/persons/', persons);
    this.app.use('/api/organizations', organizations);
    this.app.use('/api/issues/', issues);
    this.app.use('/api/emp/', emp);
    this.app.use('/api/customers/', customers);
    this.app.use('/api/projects/', projects);
  }

  public routes () {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }

}