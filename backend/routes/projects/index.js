'use strict';

const router = require('express').Router();
const ProjectAPI = require('./class.ProjectAPI.js');

module.exports = router
// GET projects
.get('/', (req, res) => {
  ProjectAPI.getProjects((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  ProjectAPI.getProjectByID({ id: req.params.id }, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  ProjectAPI.createProject(req.session, req.body, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  ProjectAPI.updateProject(req.session, req.body, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/start_project/:id', (req, res) => {
  ProjectAPI.startProject(req, res);
});