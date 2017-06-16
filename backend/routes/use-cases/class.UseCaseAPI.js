'use strict';

const sql = require('./sql.js');
const db = require('./../../db.js');

module.exports = class UseCaseAPI {
  static getUseCases(cb) {
    db.selectAllRecords({
      text: sql.useCases.SELECT_ALL_USE_CASES()
    }, (response) => {
      if (response) return cb({ status: response, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
}
