'use strict';

const router = require('express').Router();
const TaskModel = require('./../../models').e_task;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = router
  .get('/', (req, res) => {
    TaskModel.findAndCountAll().then(result => {
      if (result.count > 0) return res.status(200).json(result.rows).end();
      else if (result.count === 0) return res.status(204).json([]).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .get('/:id', (req, res) => {
    TaskModel.findById(req.params.id, { returning: true, plain: true }).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .post('/', (req, res) => {
    TaskModel.create(req.body).then(data => {
      const task = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, task);
      });
      res.io.emit('createdTaskID', task.id);
      return res.status(201).json(task).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .put('/:id', (req, res) => {
    req.body.id = req.params.id;
    TaskModel.update(req.body, {
      where: { id: req.body.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return res.status(204).json([]).end();
      const task = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, task);
      });
      res.io.emit('updatedTaskID', task.id);
      return res.status(200).json(task).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .delete('/:id', (req, res) => {
    TaskModel.update({ isDeleted: true }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const task = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, task);
      })
      res.io.emit('deletedTaskID', task.id);
      return res.status(200).json(task).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .options('/:id', (req, res) => {
    TaskModel.update({ isDeleted: false }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const task = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: req.session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, task);
      });
      res.io.emit('restoredTaskID', task.id);
      return res.status(200).json(task).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  });