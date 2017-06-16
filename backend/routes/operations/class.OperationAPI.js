'use strict';

const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class OperationAPI {
  static getAllOperations(cb) {
    db.selectAllRecords({
      text: sql.operations.SELECT_ALL_OPERATIONS()
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    })
  }
  static createOperation(data, cb) {
    db.insertRecord({
      text: sql.operations.INSERT_OPERATION(data)
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    });
  }
}