'use strict';

const router = require('express').Router();
const OrganizationAPI = require('./class.OrganizationAPI.js');
const api = new OrganizationAPI();

router
.get('/', function (req, res) {
  api.getOrganizations(req, res);
})
.get('/:id', function (req, res) {
  api.getOrganizationByID(req, res);
})
.post('/', function (req, res) {
  api.createOrganization(req, res);
})
.put('/:id', function (req, res) {
  api.updateOrganization(req, res);
})
.delete('/:id', function (req, res) {
  api.deleteOrganization(req, res);
})
.options('/:id', function (req, res) {
  api.restoreOrganization(req, res);
})

module.exports = router;
