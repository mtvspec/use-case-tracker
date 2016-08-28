'use strict';

const router = require('express').Router();
const PersonAPI = require('./class.PersonAPI.js');
const api = new PersonAPI();

router
.get('/', function (req, res) {
  api.getPersons(req, res);
})
.get('/:id', function (req, res) {
  api.getPersonByID(req, res);
})
.post('/', function (req, res) {
  api.createPerson(req, res);
})
.put('/:id', function (req, res) {
  api.updatePerson(req, res);
})
.delete('/:id', function (req, res) {
  api.deletePerson(req, res);
})
.options('/:id', function (req, res) {
  api.restorePerson(req, res);
});

module.exports = router;
