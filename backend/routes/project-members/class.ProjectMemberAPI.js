'use strict';

////////////////////////////////////////////////////////////////////////////////

const validator = require('indicative');
const db = require('db');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

////////////////////////////////////////////////////////////////////////////////

const _projectMembers = [];

////////////////////////////////////////////////////////////////////////////////

module.exports = class ProjectMemberAPI {
  static getProjectMembers(cb) {
    if (_projectMembers.length > 0) return cb({ status: 200, data: _projectMembers });
    else return cb({ status: 204, data: [] });
  }
  static getProjectMemberByID(projectMember, cb) {
    let isFound = false;
    for (let i in _projectTeams) {
      if (_projectMembers[i].id == projectMember.id) {
        isFound = true;
        return cb({ status: 200, data: _projectMembers[i] });
      }
    }
    if (isFound === false) return cb({ status: 204, data: [] });
  }
  static createProjectMember(session, data, cb) {
    const pattern = {
      eProjectTeamID: 'required',
      ePersonID: 'required',
    }
    validator.validateAll(data, pattern).then((projectMember) => {
      db.insertRecord({
        text: sql.projectMembers.INSERT_PROJECT_MEMBER(projectMember)
      }, (response) => {
        if (response.status === 201) {
          const projectMember = response.data;
          _projectMembers.push(projectMember);
          OperationAPI.createOperation({
            operationTypeID: 142, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProjectMember(response.data.id, projectMember);
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
  static updateProjectMember(session, data, cb) {
    const pattern = {
      eProjectTeamID: 'required',
      ePersonID: 'required',
      dProjectMemberStateID: 'required',
      isDeleted: 'boolean'
    }
    validator.validateAll(data, pattern).then((projectMember) => {
      db.updateRecord({
        text: sql.projectMembers.UPDATE_PROJECT_MEMBER(projectMember)
      }, (response) => {
        if (response.status === 200) {
          const projectMember = response.data;
          for (let i in _projectMembers) {
            if (_projectMembers[i].id == projectMember.id) {
              _projectMembers[i] = projectMember;
              break;
            }
          }
          OperationAPI.createOperation({
            operationTypeID: 143, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProjectMember(response.data.id, projectMember);
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
  static deleteProjectMember(session, projectMember, cb) {
    db.updateRecord({
      text: sql.projectMembers.DELETE_PROJECT_MEMBER(projectMember)
    }, (response) => {
      if (response.status === 200) {
        const projectMember = response.data;
        for (let i in _projectMembers) {
          if (_projectMembers[i].id == projectMember.id) {
            _projectMembers[i] = projectMember;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 144, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logProjectMember(response.data.id, projectMember);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response.status === 204) return cb({ status: response.status, data: response.data }); 
      else return cb({ status: 500, data: null });
    });
  }
  static restoreProjectMember(session, projectMember, cb) {
    db.updateRecord({
      text: sql.projectMembers.RESTORE_PROJECT_MEMBER(projectMember)
    }, (response) => {
      if (response.status === 200) {
        const projectMember = response.data;
        for (let i in _projectMembers) {
          if (_projectMembers[i].id == projectMember.id) {
            _projectMembers[i] = projectMember;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 145, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logProjectMember(response.data.id, projectMember);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response.status === 204) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
}
