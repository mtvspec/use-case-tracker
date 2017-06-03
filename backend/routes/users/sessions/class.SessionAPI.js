'use strict';

const db = require('./../../../db.js');
const sql = require('./sql.js');
let Sessions = require('./Sessions.js');

module.exports = class SessionAPI {
  constructor() {

  }
  static openSession(sessionData, cb) {
    db.insertRecord({
      text: sql.sessions.OPEN_SESSION(sessionData)
    }, function (response) {
      return cb(response);
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
