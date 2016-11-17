'use strict';

const db = require('./../../../db.js');
const sql = require('./sql.js');

module.exports = class SessionAPI {
  constructor() {

  }
  static openSession(id, cb) {
    db.insertRecord({
      text: sql.sessions.OPEN_SESSION(id)
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