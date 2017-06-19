'use strict';

const router = require('express').Router();
const validator = require('indicative');
const PersonAPI = require('./class.PersonAPI.js');
const db = require('./../../db.js');

module.exports = router
  /**
   * @desc This service fetches all persons
   * @method Get all persons
   * @return {array} Persons
   */
  .get('/', function (req, res) {
    PersonAPI.getPersons((response) => {
      return res.status(response.status).json(response.data).end();
    });
  })
  /**
   * @desc This service fetches person by id
   * @method Get person by id
   * @param {number} personID
   * @return {object} Person
   */
  .get('/:id', function (req, res) {
    PersonAPI.getPersonByID({ id: req.params.id }, (response) => {
      return res.status(response.status).json(response.data).end();
    });
  })
  /**
   * @desc This service creates person
   * @method Create person
   * @param {object} personData
   * @return {number} create_person
   */
  .post('/', (req, res) => {
    PersonAPI.createPerson(req.session, req.body, (response) => {
      if (response.status === 201) res.io.emit('createdPersonID', response.data.id);
      return res.status(response.status).json(response.data).end();
    })
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
    PersonAPI.updatePerson(req.session, req.body, (response) => {
      if (response.status === 200) res.io.emit('updatedPersonID', response.data.id);
      return res.status(response.status).json(response.data).end();
    });
  })
  /**
   * @desc This function logically deletes person by it's id
   * @method Delete person by personID
   * @param {number} personID
   * @return {number} id
   */
  .delete('/:id', (req, res) => {
    PersonAPI.deletePerson(req.session, { id: req.params.id }, (response) => {
      if (response.status === 200) res.io.emit('deletedPersonID', response.data.id);
      return res.status(response.status).json(response.data).end();
    });
  })
  /**
   * @desc This function restores logically deleted person by it's id
   * @method Restore deleted person by personID
   * @param {number} personID
   * @return {number} id
   */
  .options('/:id', (req, res) => {
    PersonAPI.restorePerson(req.session, { id: req.params.id }, (response) => {
      if (response.status === 200) res.io.emit('restoredPersonID', response.data.id);
      return res.status(response.status).json(response.data).end();
    });
  });

function logToDB(sessionID, err, data) {
  console.log(JSON.stringify(data));
  db.insertRecord({
    text: `
    INSERT INTO log.error_log (
      e_session_id,
      err_message,
      err_stack,
      data
    )
    VALUES (
      ${sessionID},
      '${err.message}',
      '${err.stack}',
      ${data}
    );
    `
  }, function (response) {
    if (response.status === 201) {
      console.log(`${err} logged`);
    }
  });
}