"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorHandler");
const persons_1 = require("./routes/persons");
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
        this.app.use('/api/persons/', persons_1.default);
        this.app.use('/api/projects/', projects_1.default);
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