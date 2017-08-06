"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorHandler");
const users_1 = require("./routes/users");
const persons_1 = require("./routes/persons");
const organizations_1 = require("./routes/organizations");
const issues_1 = require("./routes/issues");
const emp_1 = require("./routes/emp");
const customers_1 = require("./routes/customers");
const projects_1 = require("./routes/projects");
const index_1 = require("./routes/index");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.requestInterceptor();
        this.api();
        this.routes();
    }
    config() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser('secret'));
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    requestInterceptor() {
        this.app.use(function (req, res, next) {
            next();
        });
    }
    api() {
        this.app.use('/api/users/', users_1.users);
        this.app.use('/api/persons/', persons_1.persons);
        this.app.use('/api/organizations', organizations_1.organizations);
        this.app.use('/api/issues/', issues_1.issues);
        this.app.use('/api/emp/', emp_1.emp);
        this.app.use('/api/customers/', customers_1.customers);
        this.app.use('/api/projects/', projects_1.projects);
    }
    routes() {
        let router;
        router = express.Router();
        index_1.IndexRoute.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map