'use strict';

const router = require('express').Router();
const OrganizationAPI = require('./class.OrganizationAPI.js');

router
.get('/', function (req, res) {
  OrganizationAPI.getOrganizations(req, res);
})
.get('/:id', function (req, res) {
  OrganizationAPI.getOrganizationByID(req, res);
})
.post('/', function (req, res) {
  OrganizationAPI.createOrganization(req, res);
})
.put('/:id', function (req, res) {
  OrganizationAPI.updateOrganization(req, res);
})
.delete('/:id', function (req, res) {
  OrganizationAPI.deleteOrganization(req, res);
})
.options('/:id', function (req, res) {
  OrganizationAPI.restoreOrganization(req, res);
})

module.exports = router;
