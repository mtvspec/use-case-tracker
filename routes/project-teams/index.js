'use strict';

const router = require('express').Router();
const ProjectTeamAPI = require('./class.ProjectTeamAPI.js');

module.exports = router
.get('/', (req, res) => {
  ProjectTeamAPI.getProjectTeams((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  ProjectTeamAPI.getProjectTeamByID({ id: req.params.id }, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  ProjectTeamAPI.createProjectTeam(req.session, req.body, (response) => {
    if (response.status === 201) res.io.emit('createdProjectTeamID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  ProjectTeamAPI.updateProjectTeam(req.session, req.body, (response) => {
    if (response.status === 200) res.io.emit('updatedProjectTeamID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.delete('/:id', (req, res) => {
  ProjectTeamAPI.deleteProjectTeam(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('deletedProjectTeamID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.options('/:id', (req, res) => {
  ProjectTeamAPI.restoreProjectTeam(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('restoredProjectTeamID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
});