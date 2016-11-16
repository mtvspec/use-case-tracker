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
  ProjectAPI.createProject(req, res);
});

module.exports = router;
