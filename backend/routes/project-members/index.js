'use strict';

const router = require('express').Router();
const ProjectMemberAPI = require('./class.ProjectMemberAPI.js');

module.exports = router
.get('/', (req, res) => {
  ProjectMemberAPI.getProjectMembers((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  ProjectMemberAPI.getProjectMemberByID({ id: req.params.id }, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  ProjectMemberAPI.createProjectMember(req.session, req.body, (response) => {
    if (response.status === 201) res.io.emit('createdProjectMemberID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  ProjectMemberAPI.updateProjectMember(req.session, req.body, (response) => {
    if (response.status === 200) res.io.emit('updatedProjectMemberID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.delete('/:id', (req, res) => {
  ProjectMemberAPI.deleteProjectMember(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('deletedProjectMemberID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.options('/:id', (req, res) => {
  ProjectMemberAPI.restoreProjectMember(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('restoredProjectMemberID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
});