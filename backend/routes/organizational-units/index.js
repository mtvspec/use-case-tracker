'use strict';

const router = require('express').Router();
const OrganizationalUnitAPI = require('./class.OrganizationalUnitAPI.js');

module.exports = router
.get('/', (req, res) => {
  OrganizationalUnitAPI.getOrganizationalUnits((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  OrganizationalUnitAPI.getOrganizationalUnitByID({ id: req.params.id}, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  OrganizationalUnitAPI.createOrganizationalUnit(req.body, (response) => {
    if (response.status === 201) res.io.emit('createdOrganizationalUnitID', response.data.key);
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  OrganizationalUnitAPI.updateOrganizationalUnit(req.body, (response) => {
    if (response.status === 200) res.io.emit('updatedOrganizationalUnitID', response.data.key);
    return res.status(response.status).json(response.data).end();
  });
})