'use strict';

const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const Database = require('./../../db.js');
const db = new Database();

const sql = require('./sql.js');

const validator = require('validator');

router
.get('/', function (req, res) {
  if (!req.headers['user-id']) {
    return res.status(401).end();
  } else {
    let user = {
      id: Number(req.headers['user-id'])
    }
    if (isID(req.headers['user-id'])) {
      db.selectAllRecords({
        text: sql.organizations.SELECT_ALL_ORGANIZATIONS(user)
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
      return res.status(401).end(`'UserID' must be type of 'INTEGER'`);
    }
  }
})
.post('/', upload.array(), function (req, res) {
  if (!req.headers['user-id']) {
    return res.status(401).end();
  } else {
    if (isID(req.headers['user-id'])) {
      let user = {
        id: Number(req.headers['user-id'])
      }
      isValidOrganization(req.body, function (output) {
        if (output.result) {
          console.log(output);
          let organization = output.data;
          if (organization.bin) {
            db.selectRecordById({
              text: sql.organizations.SELECT_ORGANIZATION_BY_BIN(organization.bin)
            }, function (status, data) {
              if (status && status === 200) {
                return res.status(400).json(`Duplicate 'BIN': ${organization.bin}`).end();
              }
            });
          }
          db.insertRecord({
            text: sql.organizations.INSERT_ORGANIZATION(organization, user)
          }, function (status, data) {
            if (status && status === 201) {
              return res.status(status).json(data).end();
            } else {
              return res.status(500).end();
            }
          });
        } else if (output.data) {
          return res.status(400).json(output.data).end();
        } else {
          return res.status(400).end();
        }
      });
    } else {
      return res.status(400).end(`Incorrect 'UserID'`);
    }
  }
})
.put('/:id', upload.array(), function (req, res) {
  if (!req.headers['user-id']) {
    return res.status(401).end();
  } else if (isID(req.headers['user-id'])) {
    let user = {
      id: Number(req.headers['user-id'])
    }
    if (isID(req.params.id)) {
      isValidOrganization(req.body, function (output) {
        if (output.result) {
          let organization = output.data;
          organization.id = Number(req.params.id);
          db.updateRecord({
            text: sql.organizations.UPDATE_ORGANIZATION(organization, user)
          }, function (status, data) {
            if (status && status === 200) {
              return res.status(status).json(data).end();
            } else if (status && status === 400) {
              return res.status(400).json(data);
            } else {
              return res.status(500).end();
            }
          });
        } else if (output.data) {
          return res.status(400).json(output.data).end();
        } else {
          return res.status(400).end();
        }
      });
    } else {
      return res.status(400).end(`'OrganizationID' is required`);
    }
  } else {
    return res.status(401).end(`Incorrect 'UserID'`);
  }
})

function isID(id) {
  if (id && typeof +id === 'number' && Number.isInteger(+id)) {
    return true;
  } else {
    return false;
  }
}

function isValidOrganization(data, cb) {
  let organization = {};
  let messages = {};
  if (data) {
    if (data.bin) {
      if (isValidBIN(data.bin)) {
        organization.bin = data.bin;
      } else {
        messages.bin = `Incorrect 'bin': ${data.bin}`;
      }
    } else {
      messages.bin = '';
    }
    if (data.shortName) {
      if (isValidShortName(data.shortName)) {
        organization.shortName = data.shortName;
      } else {
        messages.shortName = `Incorrect 'shortName': ${data.shortName}`;
      }
    } else {
      messages.shortName = `'shortName' is required`;
    }
    if (data.officialName) {
      if (isValidOfficialName(data.officialName)) {
        organization.officialName = data.officialName;
      } else {
        messages.officialName = `Incorrect 'officialName': ${data.officialName}`;
      }
    } else {
      messages.officialName = '';
    }
    if (Object.keys(messages) > 0) {
      return cb({
        result: false,
        data: messages
      });
    } else {
      return cb({
        result: true,
        data: organization
      });
    }
  } else {
    return cb({
      result: false
    });
  }
}

function isValidBIN(bin) {
  if (bin
    && typeof bin === 'string'
    && bin.length === 12) {
    return true;
  } else {
    return false;
  }
}

function isValidShortName (shortName) {
  if (shortName
  && typeof shortName === 'string'
  && shortName.length > 1
  && shortName.length <= 1000) {
    return true;
  } else {
    return false;
  }
}

function isValidOfficialName (officialName) {
  if (officialName
  && typeof officialName === 'string'
  && officialName.length > 1
  && officialName.length <= 4000) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
