'use strict';

const router = require('express').Router();
const PersonAPI = require('./class.PersonAPI.js');

router
.get('/', function (req, res) {
  PersonAPI.getPersons(req, res);
})
.get('/:id', function (req, res) {
  PersonAPI.getPersonByID(req.params.id, function(response) {
    if (response && response.status === 200) {
      return res
      .status(200)
      .json(response.data)
      .end();
    } else if (response.status === 204) {
      return res
      .status(204)
      .end();
    } else {
      return res
      .status(response.status)
      .data(response.data)
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
  PersonAPI.deletePerson(req, res);
})
.options('/:id', function (req, res) {
  PersonAPI.restorePerson(req, res);
});

module.exports = router;
