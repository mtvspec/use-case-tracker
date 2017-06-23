'use strict';

const sql = require('./sql.js');
const db = require('db');

module.exports = class SystemAPI {
  static getSystems(req, res) {
    db.selectAllRecords({
      text: sql.systems.SELECT_ALL_SYSTEMS()
    }, function (response) {
      if (response.status === 200) {
        return res
        .status(200)
        .json(response.data)
        .end();
      } else if (response.status === 204) {
        return res
        .status(204)
        .json([])
        .end();
      } else {
        return res
        .status(500)
        .end();
      }
    });
  }
  static createSystem(req, res) {
    let result = new System(req.body);
    let session = {
      token: req.cookies.session
    }
    let user = {
      id: req.body.id
    }
    if (result.system) {
      let system = result.system;
      UserAPI.getUserID(session.token, function (response) {
        if (response.status === 200) {
          db.insertRecord({
            text: sql.systems.INSERT_SYSTEM(system, {id: response.data.sessionID}, {id: response.data.userID})
          }, function (response) {
            if (response.status === 201) {
              return res
              .status(201)
              .json({id: response.data.create_system})
              .end();
            } else {
              return res
              .status(400)
              .end();
            }
          });
        } else {
          return res
          .status(400)
          .end();
        }
      });
    } else {
      return res
      .status(400)
      .json(result)
      .end();
    }
  }
}
