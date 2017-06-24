'use strict';

const db = require('db');
const sql = require('./sql.js');

module.exports = class LogAPI {
  static logPerson (operationID, person) {
    PersonLog
    // db.insertRecordP({
    //   text: sql.persons.INSERT_RECORD(operationID, person)
    // }).then((response) => {
    //   if (response.status !== 201) {
    //     console.error(response);
    //   }
    // });
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
  static logIssue(operationID, issue) {
    db.insertRecord({
      text: sql.issues.INSERT_RECORD(operationID, issue)
    }, (response) => {
      if (response.status !== 201) {
        console.error(response);
      }
    });
  }
  static logProjectTeam(operationID, projectTeam) {
    db.insertRecord({
      text: sql.projectTeams.INSERT_RECORD(operationID, projectTeam)
    }, (response) => {
      if (response.status !== 201) {
        console.error(response);
      }
    });
  }
  static logProjectMember(operationID, projectMember) {
    db.insertRecord({
      text: sql.projectMembers.INSERT_RECORD(operationID, projectMember)
    }, (response) => {
      if (response.status !== 201) {
        console.error(response);
      }
    });
  }
}