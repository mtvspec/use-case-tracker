"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseFields = require('graphql-parse-fields');
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const graphqlLogger = { log: (e) => console.trace(e.stack) };
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const uuid = require("uuid");
const errorHandler = require("errorHandler");
const sessions_service_1 = require("./services/sessions.service");
const debug = require('debug');
debug(apollo_server_express_1.graphqlExpress);
debug('Debug');
const services = require("./services");
const graphql_1 = require("./graphql");
const knex_1 = require("./knex");
const knexLogger = require("knex-logger");
graphql_tools_1.addErrorLoggingToSchema(graphql_1.default, graphqlLogger);
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.api();
    }
    config() {
        this.app.use(knexLogger(knex_1.default));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser('QRaLay'));
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.requestInterceptor();
        this.app.use('/api/graphql', bodyParser.text({ type: 'application/graphql' }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.operationName === 'authentificateUser')
                return next();
            this.validateToken(req, res, next);
        }));
        this.app.use('/api/graphql', apollo_server_express_1.graphqlExpress((req) => ({
            schema: graphql_1.default,
            context: { services, session: req.body.session, utils: { parseFields } },
            debug: true,
        })));
        this.app.use('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/api/graphql' }));
        this.app.use(errorHandler());
    }
    requestInterceptor() {
        this.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            requestLogger(req, res);
            next();
        }));
    }
    api() {
    }
    responseInterceptor() {
        this.app.use((req, res, next) => {
            responseLogger(res);
            next();
        });
    }
    validateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers['authorization']) {
                return res.status(401).json('Unauthorised').end();
            }
            if (req.headers['authorization'] && typeof req.headers['authorization'] === 'string') {
                const token = req.headers['authorization'];
                const response = yield sessions_service_1.SessionsService.validateToken(token);
                if (!(response && response.id > 0)) {
                    return res.status(401).json('Invalid token').end();
                }
                const session = yield sessions_service_1.SessionsService.refreshToken(response.id);
                req.body.session = session;
                return next();
            }
        });
    }
}
exports.Server = Server;
function requestLogger(req, res) {
    console.log(' ');
    console.log('--========================================================== New response =========================================================--');
    console.log('request at ', Date());
    req.$id = uuid();
    res.locals.id = req.$id;
    console.log('request id: ', req.$id);
    if (req.body.query) {
        console.log(' ');
        console.log('-------------------------------------------------------------------------------------------------------------------------------------');
        console.log(' ');
        if (req.body.operationName)
            console.log(`operation: ${req.body.operationName}\n`);
        if (req.body.query)
            console.log(`${req.body.query}\n`);
        if (req.body.variables) {
            console.log(`variables:`);
            console.log(req.body.variables);
        }
        console.log(' ');
        console.log('-------------------------------------------------------------------------------------------------------------------------------------');
    }
}
function responseLogger(res) {
    console.log('Response send');
}
function validateToken(data) {
    if (data &&
        typeof data === 'string' && data.length > 0 &&
        data !== 'undefined' && data !== 'null')
        return true;
    else
        return false;
}
//# sourceMappingURL=server.js.map