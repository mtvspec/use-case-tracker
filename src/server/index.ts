const parseFields = require('graphql-parse-fields')
import { graphqlExpress } from 'apollo-server-express'
import { addErrorLoggingToSchema } from 'graphql-tools'
const graphqlLogger = { log: (e) => console.trace(e.stack) }
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'
import * as uuid from 'uuid'
import errorHandler = require('errorHandler')
import methodOverride = require('method-override')
import AuthService from '../services/auth.service'
import { UsersService } from '../services/users.service'
import { SessionsService } from '../services/sessions.service'

import * as debug from 'debug'

debug(graphqlExpress)
debug('Debug')

import * as services from '../services'
import schema from '../graphql'

import pg from '../knex'
import * as knexLogger from 'knex-logger'

addErrorLoggingToSchema(schema, graphqlLogger);

export class Server {
  public app: express.Application
  public static bootstrap (): Server {
    return new Server()
  }
  constructor() {
    this.app = express()
    this.config()
    this.api()
    // this.responseInterceptor();
  }
  public config () {
    this.app.use(knexLogger(pg))
    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json())
    this.app.use(cookieParser('QRaLay'))
    //catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404
      next(err)
    });
    this.requestInterceptor()
    this.app.use('/api/graphql', bodyParser.text({ type: 'application/graphql' }), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.cookies)
      this.validateToken(req, res, next)
    })
    this.app.use('/api/graphql',
      graphqlExpress(
        (req: express.Request, res: express.Response) => (
          {
            schema,
            context: { req, res, services, session: req.body.session, utils: { parseFields } },
            debug: true,
          }
        )
      )
    )
    this.app.use(errorHandler());
  }
  public requestInterceptor () {
    this.app.use(async (req: express.Request, res: express.Response, next: express.NextFunction):
      Promise<any> => {
      requestLogger(req, res)
      next()
    })
  }
  public api () {
  }
  public responseInterceptor () {
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      responseLogger()
      next()
    })
  }
  public async validateToken (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.operationName === 'authentificateUser') return next()
    if (req.cookies['session']) {
      const response = await SessionsService.getSession(req.cookies['session'])
      if (response.id > 0) {
        req.body.session = response
        return next()
      } else {
        return res.status(401).json('invalid token').end()
      }
    } else {
      if (!req.headers['authorization']) { return res.status(401).json('Unauthorised').end() }
      if (req.headers['authorization'] && typeof req.headers['authorization'] === 'string') {
        const token: string = <string>req.headers['authorization']
        const response = await <any>SessionsService.validateToken(token)
        if (!(response && response.id > 0)) { return res.status(401).json('Invalid token').end() }
        const session = await SessionsService.refreshToken(response.id)
        req.body.session = session
        return next()
      }
    }
  }
}
function requestLogger (req, res) {
  console.log(' ')
  console.log('--========================================================== New response =========================================================--')
  console.log('request at ', Date())
  req.$id = uuid()
  res.locals.id = req.$id
  console.log('request id: ', req.$id)
  console.log('request ip:', req.ip)
  if (req.body.query) {
    console.log(' ');
    console.log('-------------------------------------------------------------------------------------------------------------------------------------')
    console.log(' ')
    if (req.body.operationName) console.log(`operation: ${req.body.operationName}\n`)
    if (req.body.query) console.log(`${req.body.query}\n`)
    if (req.body.variables) { console.log(`variables:`); console.log(req.body.variables) }
    console.log(' ')
    console.log('-------------------------------------------------------------------------------------------------------------------------------------')
  }
}
function responseLogger () {
  console.log('Response send')
}
function validateToken (data: string): boolean {
  if
  (
    data &&
    typeof data === 'string' && data.length > 0 &&
    data !== 'undefined' && data !== 'null'
  ) return true
  else return false
}