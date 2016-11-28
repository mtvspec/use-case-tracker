'use strict';

const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class DictAPI {
  constructor() {

  }
  static getUseCaseSliceStates(req, res) {
    db.selectAllRecords({
      text: sql.dict.SELECT_ALL_SLICE_STATES()
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
      }
    })
  }
  static getDefectStates(req, res) {
    db.selectAllRecords({
      text: sql.dict.SELECT_ALL_DEFECT_STATES()
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
      }
    })
  }
}
