'use strict';

const router = require('express').Router();
const DictModel = require('./../../models').e_dict;
const DictValueModel = require('./../../models').e_dict_value;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = router
  .get('/', (req, res) => {
    DictValueModel.findAndCountAll().then(result => {
      if (result.count > 0) return res.status(200).json(result.rows).end();
      else if (result.count === 0) return res.status(204).json([]).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .get('/:dictName', (req, res) => {
    const dictName = req.params.dictName;
    console.log(dictName);
    DictModel.findAndCountAll({
    include: [{
        model: DictValueModel,
        as: 'e_dict',
        where: { aDictSystemName: `'${dictName}'` }
    }, ]
}, {
  returning: true,
  plain: true
}).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .get('/:id', (req, res) => {
    DictValueModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .post('/', (req, res) => {
    DictValueModel.create(req.body).then(data => {
      const dictValue = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, dictValue);
      });
      res.io.emit('createdPersonID', dictValue.id);
      return res.status(201).json(dictValue).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .put('/:id', (req, res) => {
    req.body.id = req.params.id;
    DictValueModel.update(req.body, {
      where: { id: req.body.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return res.status(204).json([]).end();
      const dictValue = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, dictValue);
      });
      res.io.emit('updatedPersonID', dictValue.id);
      return res.status(200).json(dictValue).end();
    }).catch(err => {
      console.error(err);
      return res.status(400).json(err.message).end();
    });
  })
  .delete('/:id', (req, res) => {
    DictValueModel.update({ isDeleted: true }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const dictValue = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, dictValue);
      })
      res.io.emit('deletedPersonID', dictValue.id);
      return res.status(200).json(dictValue).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  .options('/:id', (req, res) => {
    DictValueModel.update({ isDeleted: false }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const dictValue = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, dictValue);
      });
      res.io.emit('restoredPersonID', dictValue.id);
      return res.status(200).json(dictValue).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  });