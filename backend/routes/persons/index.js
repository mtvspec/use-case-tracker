'use strict';

const router = require('express').Router();
const PersonModel = require('./../../models').e_person;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = router
  /**
    * @desc This service fetches all persons
    * @method Get all persons
    * @return {array} Persons
    */
  .get('/', function (req, res) {
    PersonModel.findAndCountAll().then(result => {
      if (result.count > 0) return res.status(200).json(result.rows).end();
      else if (result.count === 0) return res.status(204).json([]).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  /**
    * @desc This service fetches person by id
    * @method Get person by id
    * @param {number} personID
    * @return {object} Person
    */
  .get('/:id', function (req, res) {
    PersonModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return res.status(204).json([]).end();
      return res.status(200).json(result).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  /**
    * @desc This service creates person
    * @method Create person
    * @param {object} personData
    * @return {number} create_person
    */
  .post('/', (req, res) => {
    PersonModel.create(req.body).then(data => {
      const person = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      });
      return res.status(201).json(person).end();
    }).catch(err => {
      console.error(err.message);
      return res.status(400).json(err.message).end();
    });
  })
  /**
    * @desc This service updates person data
    * @method Update person data
    * @param {number} personID
    * @param {object} personData
    * @return {number} update_person
    */
  .put('/:id', (req, res) => {
    req.body.id = req.params.id;
    PersonModel.update(req.body, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return res.status(204).json([]).end();
      const person = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      });
      return res.status(200).json(person).end();
    }).catch(err => {
      console.error(err.message);
      return res.status(400).json(err.message).end();
    });
  })
  /**
    * @desc This function logically deletes person by it's id
    * @method Delete person by personID
    * @param {number} personID
    * @return {number} id
    */
  .delete('/:id', (req, res) => {
    PersonModel.update({ isDeleted: true }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const person = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      })
      return res.status(200).json(person).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  })
  /**
    * @desc This function restores logically deleted person by it's id
    * @method Restore deleted person by personID
    * @param {number} personID
    * @return {number} id
    */
  .options('/:id', (req, res) => {
    PersonModel.update({ isDeleted: false }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return res.status(204).json([]).end();
      const person = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      })
      return res.status(200).json(person).end();
    }).catch(err => {
      console.error(err);
      return res.status(500).end();
    });
  });