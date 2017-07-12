'use strict';

const router = require('express').Router();
const ProjectModel = require('./../../models').e_project;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = router
  // GET projects
  .get('/', (req, res) => {
    ProjectModel.findAndCountAll().then(result => {
      if (result.count > 0) return res.status(200).json(result.rows).end();
      else if (result.count === 0) return res.status(204).json([]).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .get('/:id', (req, res) => {
    ProjectModel.findById(req.params.id, { returning: true, plain: true }).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .post('/', (req, res) => {
    ProjectModel.create(req.body).then(data => {
      const project = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 47, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logProject(response.data.id, project);
      });
      res.io.emit('createdProjectID', project.id);
      return res.status(201).json(project).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .put('/:id', (req, res) => {
    req.body.id = req.params.id;
    ProjectModel.update(req.body, {
      where: { id: req.body.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return res.status(204).json([]).end();
      const project = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 48, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logProject(response.data.id, project);
      });
      res.io.emit('updatedProjectID', project.id);
      return res.status(200).json(project).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .delete('/:id', (req, res) => {
    ProjectModel.update({ isDeleted: true }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const project = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 146, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logProject(response.data.id, project);
      });
      res.io.emit('deletedProjectID', project.id);
      return res.status(200).json(project).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .options('/:id', (req, res) => {
    ProjectModel.update({ isDeleted: false }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const project = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 147, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logProject(response.data.id, project);
      });
      res.io.emit('restoredProjectID', project.id);
      return res.status(200).json(project).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .post('/start_project/:id', (req, res) => {
    ProjectAPI.startProject(req, res);
  });