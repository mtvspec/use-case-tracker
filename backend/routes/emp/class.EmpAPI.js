'use strict';

const db = require('db');
const sql = require('./sql.js');

module.exports = class EmpAPI {
  static getEmps(cb) {
    db.selectAllRecordsP({
      text: sql.emp.SELECT_ALL_EMP()
    }).then((response) => {
      return cb(response);
    }, (err) => {
      return cb(err);
    });
  }
}