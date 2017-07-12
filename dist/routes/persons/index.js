"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persons = express_1.Router();
persons
    .get('/', (req, res) => {
    console.log(req.body);
    res.json({ hello: 'world!' });
});
exports.default = persons;
//# sourceMappingURL=index.js.map