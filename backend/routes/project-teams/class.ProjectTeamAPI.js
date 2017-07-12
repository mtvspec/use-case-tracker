'use strict';

////////////////////////////////////////////////////////////////////////////////

const validator = require('indicative');
const db = require('db');;
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

////////////////////////////////////////////////////////////////////////////////

const _projectTeams = [];

////////////////////////////////////////////////////////////////////////////////

module.exports = class ProjectTeamAPI {
  static getProjectTeams(cb) {
    if (_projectTeams.length > 0) return cb({ status: 200, data: _projectTeams });
    else return cb({ status: 204, data: [] });
  }
  static getProjectTeamByID(projectTeam, cb) {
    let isFound = false;
    for (let i in _projectTeams) {
      if (_projectTeams[i].id == projectTeam.id) {
        isFound = true;
        return cb({ status: 200, data: _projectTeams[i] });
      }
    }
    if (isFound === false) return cb({ status: 204, data: [] });
  }
  static createProjectTeam(session, data, cb) {
    const pattern = {
      id: 'required',
      aProjectTeamName: 'required|string|min:1|max:1000',
      aProjectTeamDesc: 'string|min:1',
    }
    validator.validateAll(data, pattern).then((projectTeam) => {
      db.insertRecord({
        text: sql.projectTeams.INSERT_PROJECT_TEAM(projectTeam)
      }, (response) => {
        if (response.status === 201) {
          const projectTeam = response.data;
          _projectTeams.push(projectTeam);
          OperationAPI.createOperation({
            operationTypeID: 137, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProjectTeam(response.data.id, projectTeam);
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
  static updateProjectTeam(session, data, cb) {
    const pattern = {
      id: 'required',
      aProjectTeamName: 'required|string|min:1|max:1000',
      aProjectTeamDesc: 'string|min:1',
      isDeleted: 'boolean'
    }
    validator.validateAll(data, pattern).then((projectTeam) => {
      db.updateRecord({
        text: sql.projectTeams.UPDATE_PROJECT_TEAM(projectTeam)
      }, (response) => {
        if (response.status === 200) {
          const projectTeam = response.data;
          for (let i in _projectTeams) {
            if (_projectTeams[i].id == projectTeam.id) {
              _projectTeams[i] = projectTeam;
              break;
            }
          }
          OperationAPI.createOperation({
            operationTypeID: 138, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProjectTeam(response.data.id, projectTeam);
          });
          return cb({ status: response.status, data: response.data });
        } else if (response.status === 204) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static deleteProjectTeam(session, projectTeam, cb) {
    db.updateRecord({
      text: sql.projectTeams.DELETE_PROJECT_TEAM(projectTeam)
    }, (response) => {
      if (response.status === 200) {
        const projectTeam = response.data;
        for (let i in _projectTeams) {
          if (_projectTeams[i].id == projectTeam.id) {
            _projectTeams[i] = projectTeam;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 139, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logProjectTeam(response.data.id, projectTeam);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response.status === 204) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  static restoreProjectTeam(session, projectTeam, cb) {
    db.updateRecord({
      text: sql.projectTeams.RESTORE_PROJECT_TEAM(projectTeam)
    }, (response) => {
      if (response.status === 200) {
        const projectTeam = response.data;
        for (let i in _projectTeams) {
          if (_projectTeams[i].id == projectTeam.id) {
            _projectTeams[i] = projectTeam;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 140, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logProjectTeam(response.data.id, projectTeam);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response.status === 204) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
}
