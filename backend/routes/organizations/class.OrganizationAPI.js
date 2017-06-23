'use strict';

let organizations = [];
const app = require('./../../app.js');
const validator = require('indicative');
const db = require('db');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = class OrganizationAPI {
  static getOrganizations(cb) {
    if (organizations.length > 0) return cb({ status: 200, data: organizations });
    else return cb({ status: 204, data: [] });
  }
  static getOrganizationByID(organization, cb) {
    let isFound = false;
    for (let i in organizations) {
      if (organizations[i].id == organization.id) {
        isFound = true;
        return cb({ status: 200, data: organizations[i] });
      }
    }
    if (isFound === false) return cb({ status: 204, data: [] });
  }
  static createOrganization(session, data, cb) {
    const pattern = {
      aOrganizarionBin: 'string|min:12|max:12',
      aOrganizationShortName: 'required|string|min: 1, max: 1000',
      aOrganizationOfficialName: 'string|min:1, max: 4000'
    }
    validator.validateAll(data, pattern).then((organization) => {
      db.insertRecord({
        text: sql.organizations.INSERT_ORGANIZATION(organization)
      }, (response) => {
        if (response.status === 201) {
          const organization = response.data;
          organizations.push(organization);
          OperationAPI.createOperation({
            operationTypeID: 49, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
          });
          return cb({ status: response.status, data: response.data });
        } else if (response) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static updateOrganization(session, data, cb) {
    const pattern = {
      aOrganizarionBin: 'string|min:12|max:12',
      aOrganizationShortName: 'required|string|min: 1, max: 1000',
      aOrganizationOfficialName: 'string|min:1, max: 4000'
    }
    validator.validateAll(data, pattern).then((organization) => {
      db.updateRecord({
        text: sql.organizations.UPDATE_ORGANIZATION(organization)
      }, (response) => {
        const organization = response.data;
        if (response.status === 200) {
          for (let i in organizations) {
            if (organizations[i].id == organization.id) {
              organizations[i] = organization;
              break;
            }
          }
          OperationAPI.createOperation({
            operationTypeID: 49, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
          });
          return cb({ status: response.status, data: response.data });
        } else if (response) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static deleteOrganization(session, organization, cb) {
    db.updateRecord({
      text: sql.organizations.DELETE_ORGANIZATION(organization)
    }, (response) => {
      if (response.status === 200) {
        const organization = response.data;
        for (let i in organizations) {
          if (organizations[i].id == organization.id) {
            organizations[i] = organization;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 49, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  static restoreOrganization(session, organization, cb) {
    db.updateRecord({
      text: sql.organizations.RESTORE_ORGANIZATION(organization)
    }, (response) => {
      if (response.status === 200) {
        const organization = response.data;
        for (let i in organizations) {
          if (organizations[i].id == organization.id) {
            organizations[i] = organization;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 49, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
}

function getOrganizations() {
  db.selectAllRecords({
    text: sql.organizations.SELECT_ALL_ORGANIZATIONS()
  }, (response) => {
    if (response.status === 200) {
      for (let i in response.data) {
        organizations.push(response.data[i]);
      }
    }
  });
}

getOrganizations();