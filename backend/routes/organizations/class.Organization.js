'use strict';

const isValidOrganization = require('./isValidOrganization.js');
const Database = require('./../../db.js');
const db = new Database();
const sql = require('./sql.js');

class Organization {
  constructor() {
    let instance = this;
    if (instance) {
      return instance;
    }
  }
  getOrganizations(req, res) {
    db.selectAllRecords({
      text: sql.organizations.SELECT_ALL_ORGANIZATIONS(req.User)
    }, function (response) {
      if (response && response.status && response.status === 200) {
        return res.status(response.status).json(response.data).end();
      } else if (response && response.status && response.status === 204) {
        return res.status(response.status).end();
      } else {
        return res.status(500).end();
      }
    });
  }
  createOrganization(req, res) {
    let organizationValidationResult = isValidOrganization(req.body);
    let result;
    if (organizationValidationResult.result) {
      if (organizationValidationResult.data.bin) {
        getOrganizationByBIN(req, res, function (response) {
          if (response && response.status === 200) {
            return res.status(400).json(`duplicate 'bin': ${req.body.bin}`).end();
          } else if (response && response.status === 204) {
            db.insertRecord({
              text: sql.organizations.INSERT_ORGANIZATION(
                req.body,
                req.User)
            }, function (response) {
              if (response.status === 201) {
                return res.status(response.status).json({
                  id: response.data.create_organization
                }).end();
              } else {
                return res.status(response.status).json(response.data).end();
              }
            });
          }
        });
      }
    } else {
      res.status(400).json(validationResult.data).end();
    }
  }
  updateOrganization(req, res) {
    let idValidationResult = isValidID(req.params.id);
    let organizationValidationResult = isValidOrganization(req.body);
    let result;
    if (idValidationResult.result && organizationValidationResult.result) {
      req.body.id = idValidationResult.data.id;
      getOrganizationByBIN(req, res, function (response) {
        if (response && (response.status === 200 || response.status === 204)) {
          if (response.id != req.body.id) {
            db.updateRecord({
              text: sql.organizations.UPDATE_ORGANIZATION(
                req.body,
                req.User
              )
            }, function (response) {
              if (response && response.status === 200) {
                return res.status(response.status).json({
                  id: response.data.update_organization
                }).end();
              } else if (response.status && response.data) {
                return res.status(response.status).json(response.data).end();
              } else {
                return res.status(500).end();
              }
            });
          } else {
            return res.status(400).json(`duplicate 'bin': ${req.body.bin}`);
          }
        }
      });
    } else if (idValidationResult.result === false) {
      return res.status(400).json(idValidationResult.data).end();
    } else if (organizationValidationResult.result === false) {
      return res.status(400).json(organizationValidationResult.data).end();
    }
  }
  deleteOrganization(req, res) {
    let idValidationResult = isValidID(req.params.id);
    let result;
    if (idValidationResult.result) {
      db.updateRecord({
        text: sql.organizations.DELETE_ORGANIZATION(
          idValidationResult.data,
          req.User
        )
      }, function (response) {
        if (response && response.status === 200) {
          return res.status(response.status).json({
            id: response.data.delete_organization
          }).end();
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    }
  }
  restoreOrganization(req, res) {
    let idValidationResult = isValidID(req.params.id);
    let result;
    if (idValidationResult.result) {
      db.updateRecord({
        text: sql.organizations.RESTORE_ORGANIZATION(
          idValidationResult.data,
          req.User
        )
      }, function (response) {
        if (response && response.status === 200) {
          return res.status(response.status).json({
            id: response.data.restore_organization
          }).end();
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    }
  }
}

function getOrganizationByBIN(req, res, cb) {
  db.selectRecordById({
    text: sql.organizations.SELECT_ORGANIZATION_BY_BIN(req.body.bin)
  }, function (response) {
    if (response && response.status && response.status === 200) {
      return cb({
        status: 204,
        id: response.data.id
      });
    } else if (response && response.status && response.status === 204) {
      return cb({
        status: 204
      });
    }
  });
}

function isValidID(data) {
  let id = Number(data);
  let messages = {};
  if (id) {
    if (typeof id === 'number'
    && Number.isInteger(+id)
    && id > 0) {
      return {
        result: true,
        data: {
          id: Number(id)
        }
      }
    } else {
      messages.id = `incorrect 'id': ${id}`;
    }
  } else {
    messages.id = `'id' is required`;
  }
  if (Object.keys(messages).length > 0) {
    return {
      result: false,
      data: messages
    }
  }
}

module.exports = Organization;
