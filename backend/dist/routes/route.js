"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoute {
    constructor() {
        this.title = 'Title';
    }
    response(req, res) {
        console.log(req);
        res.send(this.title);
    }
    ;
}
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=route.js.map