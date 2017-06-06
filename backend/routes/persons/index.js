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
  PersonAPI.getPersonByID(req.params.id, function(response) {
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
.delete('/:id', function (req, res) {
  PersonAPI.deletePerson({
    personID: req.params.id,
    sessionID: req.session.sessionID,
    userID: req.session.userID
  }, function (response) {
    if (response && response.status === 200) {
      return res
      .status(200)
      .json({
        id: response.data.delete_person
      })
      .end();
    } else if (response.status === 204) {
      return res
      .status(204)
      .end();
    } else {
      return res
      .status(500)
      .end();
    }
  });
})
.options('/:id', function (req, res) {
  PersonAPI.restorePerson({
    personID: req.params.id,
    sessionID: req.session.sessionID,
    userID: req.session.userID
  }, function(response) {
    if (response && response.status === 200) {
      return res
      .status(200)
      .json({
        id: response.data.restore_person
      })
      .end();
    } else if (response.status === 204) {
      return res
      .status(204)
      .end();
    } else {
      return res
      .status(500)
      .end();
    }
  });
});

module.exports = router;
