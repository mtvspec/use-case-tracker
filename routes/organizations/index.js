'use strict';

const router = require('express').Router();
const OrganizationAPI = require('./class.OrganizationAPI.js');

module.exports = router
.get('/', (req, res) => {
  OrganizationAPI.getOrganizations((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  OrganizationAPI.getOrganizationByID({ id: req.params.id }, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  OrganizationAPI.createOrganization(req.session, req.body, (response) => {
    if (response.status === 201) res.io.emit('createdOrganizationID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  OrganizationAPI.updateOrganization(req.session, req.body, (response) => {
    if (response.status === 200) res.io.emit('updatedOrganizationID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.delete('/:id', (req, res) => {
  OrganizationAPI.deleteOrganization(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('deletedOrganizationID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.options('/:id', (req, res) => {
  OrganizationAPI.restoreOrganization(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('restoredOrganizationID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
});
