'use strict';

////////////////////////////////////////////////////////////////////////////////

const moment = require('moment');
const validator = require('indicative');
const db = require('db');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

////////////////////////////////////////////////////////////////////////////////

let _projects = [];

////////////////////////////////////////////////////////////////////////////////

module.exports = class ProjectAPI {
  static getProjects(cb) {
    if (_projects.length > 0) return cb({ status: 200, data: _projects });
    else return cb({ status: 204, data: [] });
  }
  static getProjectByID(project, cb) {
    let isFound = false;
    for (let i in _projects) {
      if (_projects[i].id == project.id) {
        isFound = true;
        return cb({ status: 200, data: _projects[i] });
      }
    }
    if (isFound === false) return cb({ status: 204, data: [] });
  }
  static createProject(session, data, cb) { 
    const pattern = {
      aProjectName: 'required|string',
      aProjectDesc: 'string',
      aOfficialProjectName: 'string',
      aPlanStartDate: 'date_format:YYYY-MM-DD',
      aPlanEndDate: 'date_format:YYYY-MM-DD',
      aFactStartDate: 'date_format:YYYY-MM-DD',
      aFactEndDate: 'date_format:YYYY-MM-DD'
    }
    validator.validate(data, pattern).then((project) => {
      project.dProjectStateID = 36;
      db.insertRecord({
        text: sql.projects.INSERT_PROJECT(project)
      }, (response) => {
        if (response.status === 201) {
          const project = response.data;
          _projects.push(project);
          OperationAPI.createOperation({
            operationTypeID: 47, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProject(response.data.id, project);
          });
          return cb({ status: response.status, data: project });
        } else if (response) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static updateProject(session, data, cb) {
    const pattern = {
      aProjectName: 'required|string',
      aProjectDesc: 'string',
      aOfficialProjectName: 'string'
    }
    validator.validate(data, pattern).then((project) => {
      project.dProjectStateID = 45;
      db.updateRecord({
        text: sql.projects.UPDATE_PROJECT(project)
      }, (response) => {
        if (response.status === 200) {
          const project = response.data;
          for (let i in _projects) {
            if (_projects[i].id == project.id) {
              _projects[i] = project;
              break;
            }
          }
          OperationAPI.createOperation({
            operationTypeID: 48, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProject(response.data.id, project);
          });
          return cb({ status: response.status, data: response.data });
        } else if (response.status === 204) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    })
  }
  static deleteProject(session, project, cb) {
    db.updateRecord({
      text: sql.projects.DELETE_PROJECT(project)
    }, (response) => {
      if (response.status === 200) {
        const project = response.data;
        for (let i in _projects) {
          if (_projects[i].id == project.id) {
            _projects[i] = project;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 146, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logProject(response.data.id, project);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response.status === 204) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  static restoreProject(session, project, cb) {
    db.updateRecord({
      text: sql.projects.RESTORE_PROJECT(project)
    }, (response) => {
      if (response.status === 200) {
        const project = response.data;
        for (let i in _projects) {
          if (_projects[i].id == project.id) {
            _projects[i] = project;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 147, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logProject(response.data.id, project);
        });
        return cb({ status: response.status, data: response.data });
      } else if (response.status === 204) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  static startProject(req, res) {
    let project = new Project(req.body);
  }
}

////////////////////////////////////////////////////////////////////////////////

function _getProjects() {
  db.selectAllRecordsP({
    text: sql.projects.SELECT_ALL_PROJECTS()
  }).then((response) => {
    if (response.status === 200) {
      let projects = [];
      for (let i in response.data) {
        projects.push({
          id: response.data[i].id,
          aProjectKindNameEN: response.data[i].aProjectKindNameEN,
          aOrganizationID: response.data[i].aOrganizationID,
          aOrganizationName: response.data[i].aOrganizationName,
          aCustomerName: response.data[i].aCustomerName,
          aProjectName: response.data[i].aProjectName,
          aProjectDesc: response.data[i].aProjectDesc,
          aContractName: response.data[i].aContractName,
          aProjectManagerFirstNameLastName: response.data[i].aProjectManagerFirstNameLastName,
          eProjectPlanID: response.data[i].eProjectPlanID,
          aOfficialProjectName: response.data[i].aOfficialProjectName,
          aPlanStartDate: moment(response.data[i].aPlanStartDate),
          aPlanEndDate: moment(response.data[i].aPlanEndDate),
          aPlanBudget: response.data[i].aPlanBudget,
          aFactStartDate: moment(response.data[i].aFactStartDate),
          aFactEndDate: moment(response.data[i].aFactEndDate),
          aFactBudget: response.data[i].aFactBudget,
          aProjectStateNameEN: response.data[i].aProjectStateNameEN,
          isDeleted: response.data[i].isDeleted
        });
        Object.assign(_projects, projects)
      }
    } else return _projects;
  }, (err) => {
    console.error(err);
  });
}

_getProjects();

////////////////////////////////////////////////////////////////////////////////