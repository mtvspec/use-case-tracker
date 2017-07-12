"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects = express_1.Router();
projects
    .get('/', (req, res) => {
    console.log(req.url);
    res.status(200)
        .json([{ id: 1, name: 'My Project!', description: 'Description of my project' }]).end();
});
exports.default = projects;
//# sourceMappingURL=index.js.map