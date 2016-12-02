'use strict';

const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class ComponentAPI {
  constructor() {

  }
  static getComponents(req, res) {
    db.selectAllRecords({
      text: sql.components.SELECT_ALL_COMPONENTS()
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
