"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_service_1 = require("./projects.service/projects.service");
const ps = new projects_service_1.ProjectsService();
const project_teams_1 = require("./project-teams");
exports.projects = express_1.Router();
exports.projects.use('/:id/project-teams', project_teams_1.projectTeams);
exports.projects
    .get('/', (req, res) => {
    ps.getAllProjects()
        .then(result => res.status(result.status).json(result.data).end(), error => res.status(error.status).json(error.data).end());
})
    .post('/', (req, res) => {
    console.log(req.body);
    if (req.body)
        res.status(201).json({ id: 3 }).end();
});
//# sourceMappingURL=index.js.map