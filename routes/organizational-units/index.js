'use strict';

const router = require('express').Router();
const OrganizationUnitModel = require('./../../models').e_organizational_unit;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = router
  .get('/', (req, res) => {
    OrganizationUnitModel.findAndCountAll().then(result => {
      if (result.count > 0) return res.status(200).json(result.rows).end();
      else if (result.count === 0) return res.status(204).json([]).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .get('/:id', (req, res) => {
    OrganizationUnitModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .post('/', (req, res) => {
    OrganizationUnitModel.create(req.body).then(data => {
      const organizationUnit = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, organizationUnit);
      });
      res.io.emit('createdPersonID', organizationUnit.id);
      return res.status(201).json(organizationUnit).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .put('/:id', (req, res) => {
    req.body.id = req.params.id;
    OrganizationUnitModel.update(req.body, {
      where: { id: req.body.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return res.status(204).json([]).end();
      const organizationUnit = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, organizationUnit);
      });
      res.io.emit('updatedPersonID', organizationUnit.id);
      return res.status(200).json(organizationUnit).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .delete('/:id', (req, res) => {
    OrganizationUnitModel.update({ isDeleted: true }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const organizationUnit = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, organizationUnit);
      })
      res.io.emit('deletedPersonID', organizationUnit.id);
      return res.status(200).json(organizationUnit).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .options('/:id', (req, res) => {
    OrganizationUnitModel.update({ isDeleted: false }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const organizationUnit = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, organizationUnit);
      });
      res.io.emit('restoredPersonID', organizationUnit.id);
      return res.status(200).json(organizationUnit).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  });