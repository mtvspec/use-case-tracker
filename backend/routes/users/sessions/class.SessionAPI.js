'use strict';

const uuid = require('uuid');
const db = require('./../../../db.js');
const sql = require('./sql.js');
let Sessions = require('./Sessions.js');

module.exports = class SessionAPI {
  constructor() {
    let instance = this;

    if (instance) return instance;
    else return this;
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
  /***
   * @function closeSession
   * @param token
   * @return cb
  */
  static closeSession(token, cb) {
    db.updateRecord({
      text: sql.sessions.CLOSE_SESSION(token)
    }, function (response) {
      if (response.status === 200) {
        for (let i = 0; i < Sessions.length; i++) {
          if (Sessions[i].token === token) {
            Sessions.splice(i, 1);
            break;
          }
        }
        return cb(response);
      } else {
        return cb(response);
      }
    });
  }
}