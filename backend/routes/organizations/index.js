'use strict';

const router = require('express').Router();
const Organization = require('./class.Organization.js');
const org = new Organization();

// remove
const Database = require('./../../db.js');
const db = new Database();
const sql = require('./sql.js');

router
.get('/', function (req, res) {
  org.getOrganizations(req, res);
})
.get('/:id', function (req, res) {
  if (!req.headers['user-id']) {
    return res.status(401).end();
  } else if (isID(req.headers['user-id'])) {
    let user = {
      id: Number(req.headers['user-id'])
    }
    if (isID(req.params.id)) {
      let organization = {
        id: Number(req.params.id)
      }
      db.selectRecordById({
        text: sql.organizations.SELECT_ORGANIZATION_BY_ID(organization, user)
      }, function (status, data) {
        if (status && status === 200) {
          return res.status(status).json(data).end();
        } else if (status && status === 204) {
          return res.status(status).end();
        } else {
          return res.status(500).end();
        }
      });
    } else {
      return res.status(400).end(`'OrganizationID' is required`);
    }
  } else {
    return res.status(401).end(`'UserID' must be type of 'INTEGER'`);
  }
})
.post('/', function (req, res) {
  org.createOrganization(req, res);
})
.put('/:id', function (req, res) {
  org.updateOrganization(req, res);
})
.delete('/:id', function (req, res) {
  org.deleteOrganization(req, res);
})
.options('/:id', function (req, res) {
  org.restoreOrganization(req, res);
})

function isID(id) {
  if (id && typeof +id === 'number' && Number.isInteger(+id)) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
