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
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).end());
})
    .get('/:id', (req, res) => {
    ps.getProject(req.params.id)
        .then(result => res.status(result.status).json(result.data).end())
        .catch(err => res.status(err.status).end());
})
    .post('/', (req, res) => {
    ps.createProject(req.body)
        .then(result => res.status(result.status).json(result.data).end(), error => res.status(error.status).json(error.data).end());
});
//# sourceMappingURL=index.js.map