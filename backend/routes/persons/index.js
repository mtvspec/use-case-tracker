'use strict';

const router = require('express').Router();
const PersonAPI = require('./class.PersonAPI.js');

router
.get('/', function (req, res) {
  PersonAPI.getPersons(function (response) {
    return res
      .status(response.status)
      .json(response.data)
      .end();
  });
})
.get('/:id', function (req, res) {
  if (validate.is.positive(req.params.id)) {
    const id = req.params.id;
    PersonAPI.getPersonByID(id, function(response) {
      return res
        .status(response.status)
        .json(response.data)
        .end();
    });
  } else {
    console.error(new Error(`id '${req.params.id}' is invalid`));
    return res
      .status(400)
      .end(`id '${req.params.id}' is invalid`);
  }
})
.post('/', function (req, res) {
  PersonAPI.createPerson(req, res);
})
.put('/:id', function (req, res) {
  let person = {
    id: req.params.id,
    data: req.body
  }
  PersonAPI.updatePerson(req.session, person, function(response) {
    return res
    .status(response.status)
    .json(response.data)
    .end();
  });
})
      return res
/**
 * @desc This function logically deletes person by it's id
 * @method Delete person by personID
 * @param {number} personID
 * @return {number} delete_person
 */
.delete('/:id', function (req, res) {
  if (validate.is.positive(req.params.id)) {
    const id = req.params.id;
    PersonAPI.deletePerson({
      personID: id,
      sessionID: req.session.sessionID,
      userID: req.session.userID
    }, function (response) {
      if (response) {
       return res
        .status(response.status)
        .json(response.data)
        .end();
      } else {
        return res
          .status(500)
          .end();
        }
      });
    } else {
      console.error(new Error(`id '${req.params.id}' is invalid`));
      return res
        .status(400)
        .end(`id '${req.params.id}' is invalid`);
    }
})
/**
 * @desc This function restores logically deleted person by it's id
 * @method Restore deleted person by personID
 * @param {number} personID
 * @return {number} restore_person
 */
.options('/:id', function (req, res) {
  if (validate.is.positive(req.params.id)) {
    const id = req.params.id;
    PersonAPI.restorePerson({
    personID: id,
    sessionID: req.session.sessionID,
    userID: req.session.userID
  }, function(response) {
    if (response) {
      return res
        .status(response.status)
        .json(response.data)
        .end();
    } else {
      return res
        .status(500)
        .end();
      }
    });
  } else {
    console.error(new Error(`id '${req.params.id}' is invalid`));
    return res
      .status(400)
      .end(`id '${req.params.id}' is invalid`);
  }
});

module.exports = router;
