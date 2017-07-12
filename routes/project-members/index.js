'use strict';

const router = require('express').Router();
const ProjectMemberModel = require('./../../models').e_project_member;
const ProjectMemberAPI = require('./class.ProjectMemberAPI.js');

module.exports = router
  .get('/', (req, res) => {
    ProjectMemberModel.findAndCountAll().then(result => {
      if (result.count > 0) return res.status(200).json(result.rows).end();
      else if (result.count === 0) return res.status(204).json([]).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .get('/:id', (req, res) => {
    ProjectMemberModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
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