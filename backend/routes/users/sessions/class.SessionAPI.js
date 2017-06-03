'use strict';

const uuid = require('uuid');
const db = require('./../../../db.js');
const sql = require('./sql.js');
let Sessions = require('./Sessions.js');

module.exports = class SessionAPI {
  constructor() {

  }
  /***
   * @function openSession
   * @param userID
   * @return cb
  */
  static openSession(userID, cb) {
    let sessionData = {
      userID: userID,
      token: uuid()
    };
    db.insertRecord({
      text: sql.sessions.OPEN_SESSION(sessionData)
    }, function (response) {
      if (response && response.status === 201) {
        Sessions.push({
          id: response.data.open_session,
          userID: sessionData.userID,
          token: sessionData.token,
          state: 'O'
        });
        return cb({
          status: 201,
          data: sessionData.token
        });
      } else {
        return cb(response);
      }
    });
  }
  static closeSession(id, cb) {
    db.updateRecord({
      text: sql.sessions.CLOSE_SESSION(id)
    }, function (response) {
      return cb(response);
    });
  }
}
