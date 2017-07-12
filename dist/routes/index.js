"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        router.get('/', (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.title = 'Index';
        this.response(req, res);
        next();
    }
}
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map