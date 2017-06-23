'use strict';

const db = require('db');
const sql = require('./sql.js');

module.exports = class LogAPI {
  static logPerson (operationID, person) {
    db.insertRecord({
      text: sql.persons.INSERT_RECORD(operationID, person)
    }, (response) => {
      if (response.status !== 201) {
        console.error(response);
      }
    });
  }
  static logProject(operationID, project) {
    db.insertRecord({
      text: sql.projects.INSERT_RECORD(operationID, project)
    }, (response) => {
      if (response.status !== 201) {
        console.error(response);
      }
    });
  }
  static logOrganization(operationID, organization) {
    db.insertRecord({
      text: sql.organizations.INSERT_RECORD(operationID, organization)
    }, (response) => {
      if (response.status !== 201) {
        console.error(response);
      }
    });
  }
}