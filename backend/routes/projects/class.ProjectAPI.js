'use strict';

const ID = require('./../../common/classes/id');
const Project = require('./class.Project.js');
const userSQL = require('./../users/sql.js');
const UserAPI = require('./../users/class.UserAPI.js');
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
  static createProject(req, id, res) {
    let result = new Project(req.body);
    let session = {
      token: req.cookies.session
    }
    let user = {
      id: id
    }
    if (result.project) {
      let project = result.project;
      UserAPI.getUserID(session.token, function (response) {
        if (response.status === 200) {
          db.insertRecord({
            text: sql.projects.INSERT_PROJECT(
              project,
              {id: response.data.sessionID},
              {id: response.data.userID}
            )
          }, function (response) {
            if (response.status === 201) {
              return res
              .status(response.status)
              .json({
                id: response.data.create_project
              })
              .end();
            } else {
              return res
              .status(response.status)
              .json(response.data)
              .end();
            }
          });
        } else {
          return res
          .status(401)
          .end();
        }
      })
    } else {
      return res.status(400).json(result.messages).end();
    }
  }
  static startProject(req, res) {
    let project = new Project(req.body);
  }
}

module.exports = ProjectAPI;

function authentificateUser(id) {
  db.selectRecordById({
    text: sql.users.SELECT_USER_BY_ID(id)
  }, function (response) {
    if (response) {
      if (response.status && response.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  })
};
