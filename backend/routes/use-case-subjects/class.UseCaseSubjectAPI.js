'use strict';

const db = require('./../../db.js');
const sql = require('./sql.js');


module.exports = class UseCaseSubjectAPI {
  constructor() {

  }
  static getSubjects(req, res) {
    db.selectAllRecords({
      text: sql.subjects.SELECT_ALL_SUBJECTS()
    }, function (response) {
      if (response && response.status === 200) {
        return res
        .status(200)
        .json(response.data)
        .end();
      } else {
        return res
        .status(response.status)
        .end();
      }
    })
  }
}
