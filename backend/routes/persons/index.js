'use strict';

const router = require('express').Router();
const PersonAPI = require('./class.PersonAPI.js');

router
.get('/', function (req, res) {
  PersonAPI.getPersons(req, res);
})
.get('/:id', function (req, res) {
  PersonAPI.getPersonByID(req, res);
})
.post('/', function (req, res) {
  PersonAPI.createPerson(req, res);
})
.put('/:id', function (req, res) {
  PersonAPI.updatePerson(req.session, req.params.id, req.body, function(response) {
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
