'use strict';

const ID = require('./../../common/classes/id');
const Project = require('./class.Project.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

class ProjectAPI {
  constructor() {

  }
  static getProjects(req, res) {
    db.selectAllRecords({
      text: sql.projects.SELECT_ALL_PROJECTS(req.User)
    }, function (response) {
      if (response) {
        if (response.status) {
          if (response.status === 200) {
            return res.status(response.status).json(response.data).end();
          } else {
            return res.status(response.status).end();
          }
        } else {
          return res.status(500).end();
        }
      } else {
        return res.status(500).end();
      }
    });
  }
  static getProjectByID(req, res) {
    let project = new ID(req.params.id);
    if (project.id) {
      db.selectRecordById({
        text: sql.projects.SELECT_PROJECT_BY_ID(project.id)
      }, function (response) {
        if (response) {
          if (response.status) {
            if (response.status === 200) {
              return res.status(response.status).json(response.data).end();
            } else {
              return res.status(response.status).end();
            }
          } else {
            return res.status(500).end();
          }
        } else {
          return res.status(500).end();
        }
      });
    } else {
      return res.status(400).json(project).end();
    }
  }
  static createProject(req, res) {
    let project = new Project(req.body);
    let id = new ID(req.headers['user-id']);
    if (project.workName) {
      db.insertRecord({
        text: sql.projects.INSERT_PROJECT(
          project,
          id
        )
      }, function (response) {
        if (response.status === 201) {
          return res.status(response.status).json({
            id: response.data.create_ptoject
          }).end();
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    } else {
      return res.status(400).json(project).end();
    }
  }
}

module.exports = ProjectAPI;
