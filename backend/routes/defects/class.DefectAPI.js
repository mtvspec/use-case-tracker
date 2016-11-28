'use strict';

const ID = require('./../../common/classes/id');
const Defect = require('./class.Defect.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class DefectAPI {
  constructor() {

  }
  static getDefects(req, res) {
    db.selectAllRecords({
      text: sql.defects.SELECT_ALL_DEFECTS()
    }, function (response) {
      if (response.status === 200) {
        return res
        .status(200)
        .json(response.data)
        .end();
      } else if (response.status === 204) {
        return res
        .status(response.status)
        .end();
      } else {
        return res
        .status(500)
        .end();
      }
    })
  }
}
