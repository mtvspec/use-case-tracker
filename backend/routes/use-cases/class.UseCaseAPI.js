'use strict';

const sql = require('./sql.js');
const db = require('./../../db.js');

module.exports = class UseCaseAPI {
  constructor() {

  }
  static getUseCases(req, res) {
    db.selectAllRecords({
      text: sql.useCases.SELECT_ALL_USE_CASES()
    }, function (response) {
      if (response && response.status === 200) {
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
    })
  }
}
