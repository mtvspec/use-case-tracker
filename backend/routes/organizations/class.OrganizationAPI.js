'use strict';

let organizations = [];
const validator = require('indicative');
const db = require('./../../db.js');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = class OrganizationAPI {
  static getOrganizations(cb) {
    return cb({ status: 200,data: organizations });
  }
  static getOrganizationByID(organization, cb) {
    console.log(organization.id);
    let isFound = false;
    for (let i = 0; i < organizations.length; i++) {
      
      console.log(organizations[i]);
      if (organizations[i].id == organization.id) {
        console.log('ok');
        isFound = true;
        return cb({ status: 200, data: organizations[i] });
      }
    }
    if (!isFound) return cb({ status: 204, data: [] });
    // db.selectRecordById({
//       text: sql.organizations.SELECT_ORGANIZATION_BY_ID(organization)
//     }, (response) => {
//       if (response) return cb(response);
//       else return cb({ status: 500, data: null });
//     });
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
          organizations.push(response.data);
          OperationAPI.createOperation({
            operationTypeID: 49, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logOrganization(response.data.id, response.data);
          });
          return cb({ status: response.status, data: { created_organization_id: response.data.id } });
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
        if (response.status === 200) {
          let organization = response.data;
          for (let i = 0; i < organizations.length; i++) {
            if (organizations[i].id == organization.id) {
              organizations[i] = organization;
            }
          }
          OperationAPI.createOperation({
            operationTypeID: 49, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
          });
          return cb({ status: response.status, data: { updated_organization_id: response.data.id } });
        } else if (response) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static deleteOrganization(session, oranization, cb) {
    db.updateRecord({
      text: sql.organizations.DELETE_ORGANIZATION(oranization)
    }, (response) => {
      if (response.status === 200) {
        let organization = response.data;
        for (let i = 0; i < organizations.length; i++) {
          if (organizations[i].id == organization.id) {
            organizations[i] = organization;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 49, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
        });
        return cb({ status: response.status, data: { deleted_organization_id: response.data.id } });
      } else if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  static restoreOrganization(session, oranization, cb) {
    db.updateRecord({
      text: sql.organizations.RESTORE_ORGANIZATION(oranization)
    }, (response) => {
      if (response.status === 200) {
        let organization = response.data;
        for (let i = 0; i < organizations.length; i++) {
          if (organizations[i].id == organization.id) {
            organizations[i] = organization;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 49, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logOrganization(response.data.id, organization);
        });
        return cb({ status: response.status, data: { restored_organization_id: response.data.id } });
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
      for (let i = 0; i < response.data.length; i++) {
        organizations.push(response.data[i]);
      }
    }
  });
}

getOrganizations();