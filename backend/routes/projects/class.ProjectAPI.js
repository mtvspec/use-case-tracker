'use strict';

const validator = require('indicative');
const db = require('db');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = class ProjectAPI {
  static getProjects(cb) {
    db.selectAllRecords({
      text: sql.projects.SELECT_ALL_PROJECTS()
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    });
  }
  static getProjectByID(project, cb) {
    db.selectRecordById({
      text: sql.projects.SELECT_PROJECT_BY_ID(project)
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    });
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
          project.id = Number(response.data.created_project_id);
          OperationAPI.createOperation({
            operationTypeID: 47, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProject(response.data.id, project, (response) => {
              console.log(`Logged:\n ${project}`);
            });
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
  static updateProject(session, data, cb) {
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
      project.dProjectStateID = 45;
      db.updateRecord({
        text: sql.projects.UPDATE_PROJECT(project)
      }, (response) => {
        if (response.status === 200) {
          OperationAPI.createOperation({
            operationTypeID: 48, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logProject(response.data.id, project);
          });
          return cb({ status: response.status, data: response.data });
        } else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    })
  }
  static startProject(req, res) {
    let project = new Project(req.body);
  }
}
