'use strict';

const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class CustomerAPI {
  constructor() {

  }
  static getCustomers(req, res) {
    db.selectAllRecords({
      text: sql.customers.SELECT_ALL_CUSTOMERS()
    }, function (response) {
      if (response && (response.status === 200 || response.status === 204)) {
        return res
        .status(response.status)
        .json(response.data)
        .end();
      } else {
        return res
        .status(500)
        .end();
      }
    })
  }
}
