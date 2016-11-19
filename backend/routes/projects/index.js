'use strict';

const router = require('express').Router();
const ProjectAPI = require('./class.ProjectAPI.js');

router
// GET projects
.get('/', function (req, res) {
  ProjectAPI.getProjects(req, res);
})
.get('/:id', function (req, res) {
  ProjectAPI.getProjectByID(req, res);
})
.post('/', function (req, res) {
  if (!req.User) {
    return;
  }
  ProjectAPI.createProject(req, res);
})
.post('/start_project/:id', function (req, res) {
  ProjectAPI.startProject(req, res);
});

module.exports = router;
