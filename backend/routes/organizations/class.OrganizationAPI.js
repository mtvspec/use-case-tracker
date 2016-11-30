'use strict';

const ID = require ('./../../common/classes/id');
const UserAPI = require('./../users/class.UserAPI.js');
const Organization = require('./class.Organization.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

class OrganizationAPI {
  constructor() {

  }
  static getOrganizations(req, res) {
    db.selectAllRecords({
      text: sql.organizations.SELECT_ALL_ORGANIZATIONS(req.User)
    }, function (response) {
      if (response && response.status && response.status === 200) {
        return res
        .status(response.status)
        .json(response.data)
        .end();
      } else if (response && response.status && response.status === 204) {
        return res
        .status(response.status)
        .end();
      } else {
        return res
        .status(500)
        .end();
      }
    });
  }
  static getOrganizationByID(req, res) {
    let organization = new ID(req.params.id);
    if (organization.id) {
      db.selectRecordById({
        text: sql.organizations.SELECT_ORGANIZATION_BY_ID(
          organization,
          req.User
        )
      }, function (response) {
        if (response) {
          return res
          .status(response.status)
          .json(response.data)
          .end();
        } else {
          return res
          .status(500)
          .end();
        }
      });
    } else {
      return res
      .status(400)
      .send(`'id' is required`)
      .end();
    }
  }
  static createOrganization(req, res) {
    let result = new Organization(req.body);
    if (result.organization) {
      let organization = result.organization;
      if (organization.aOrganizationBin) {
        OrganizationAPI.getOrganizationByBIN(organization.aOrganizationBin, res, function (response) {
          if (response && response.status === 200) {
            return res
            .status(400)
            .json(`duplicate 'bin': ${organization.aOrganizationBin}`)
            .end();
          }
        });
      }
      if (res.headersSent) {
        return;
      }
      let token = req.cookies.session;
      if (!token) {
        return res
        .status(401)
        .end();
      } else {
        UserAPI.getUserID(token, function (response) {
          if (response && response.status === 200) {
            db.insertRecord({
              text: sql.organizations.INSERT_ORGANIZATION(
                organization,
                {id: response.data.sessionID},
                {id: response.data.userID}
              )
            }, function (response) {
              if (response && response.status === 201) {
                return res
                .status(response.status)
                .json({
                  id: response.data.create_organization
                })
                .end()
              } else {
                return res
                .status(response.status)
                .json(response.data)
                .end();
              }
            })
          } else {
            return res
            .status(401)
            .end();
          }
        })
      }
    } else {
      return res
      .status(400)
      .json(org)
      .end();
    }
  }
  static updateOrganization(req, res) {
    let id = new ID(req.params.id);
    let organization = new Organization(req.body);
    if (id.id && organization) {
      organization.id = id.id;
      OrganizationAPI.getOrganizationByBIN(organization.bin, res, function (response) {
        if (response && (response.status === 200 || response.status === 204)) {
          if (response.id != req.body.id) {
            db.updateRecord({
              text: sql.organizations.UPDATE_ORGANIZATION(
                organization,
                req.User
              )
            }, function (response) {
              if (response && response.status === 200) {
                return res
                .status(response.status)
                .json({
                  id: response.data.update_organization
                })
                .end();
              } else if (response.status && response.data) {
                return res
                .status(response.status)
                .json(response.data)
                .end();
              } else {
                return res
                .status(500)
                .end();
              }
            });
          } else {
            return res
            .status(400)
            .json(`duplicate 'bin': ${organization.bin}`)
            .end();
          }
        }
      });
    } else {
      return res
      .status(400)
      .json(organization)
      .end();
    }
  }
  static deleteOrganization(req, res) {
    let organization = new ID(req.params.id);
    if (organization.id) {
      db.updateRecord({
        text: sql.organizations.DELETE_ORGANIZATION(
          organization,
          req.User
        )
      }, function (response) {
        if (response && response.status === 200) {
          return res
          .status(response.status)
          .json({
            id: response.data.delete_organization
          })
          .end();
        } else {
          return res
          .status(response.status)
          .json(response.data)
          .end();
        }
      });
    }
  }
  static restoreOrganization(req, res) {
    let organization = new ID(req.params.id);
    if (organization.id) {
      db.updateRecord({
        text: sql.organizations.RESTORE_ORGANIZATION(
          organization,
          req.User
        )
      }, function (response) {
        if (response && response.status === 200) {
          return res
          .status(response.status)
          .json({
            id: response.data.restore_organization
          })
          .end();
        } else {
          return res
          .status(response.status)
          .json(response.data)
          .end();
        }
      });
    }
  }
}

OrganizationAPI.getOrganizationByBIN = function (bin, res, cb) {
  db.selectRecordById({
    text: sql.organizations.SELECT_ORGANIZATION_BY_BIN(bin)
  }, function (response) {
    if (response && response.status && response.status === 200) {
      return cb({
        status: 200,
        id: response.data.id
      });
    } else if (response && response.status && response.status === 204) {
      return cb({
        status: 204
      });
    }
  });
}

module.exports = OrganizationAPI;
