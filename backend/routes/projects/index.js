'use strict';

const router = require('express').Router();
const UserAPI = require('./../users/class.UserAPI.js');
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
  if (!req.cookies.session) {
    return res
    .status(401)
    .end();
  }
  let session = req.cookies.session;
  UserAPI.getUserID(session, function(response) {
    if (response.status === 200) {
      ProjectAPI.createProject(req, response.data.id, res);
    } else {
      return res
      .status(401)
      .end();
    }
  });
  
})
.post('/start_project/:id', function (req, res) {
  ProjectAPI.startProject(req, res);
});

module.exports = router;