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
  /***
  * @param customerData
  * @return customerID
  */
  static createCustomer(req, res) {
    db.insertRecord({
      text: sql.customers.INSERT_CUSTOMER(customerData)
    }, function (response) {
      if (response && response.status === 201) {
        return res
        .status(response.status)
        .json(response.data.create_customer)
        .end();
      } else {
        return res
        .status(500)
        .end();
      }
    });
  }
  /***
   * @param customerID
   * @return customerID
   */
   static deleteCustomer(req, res) {
     db.updateRecord({
       text: sql.customers.DELETE_CUSTOMER(customerID)
     }, function (response) {
       if (response && response.status === 200) {
         return res
         .status(200)
         .json(response.data.delete_customer)
         .end();
       } else if (response && response.status === 204) {
         return res.
         status(204)
         .end();
       } else {
         return
         res
         .status(500)
         .end();
       }
     })
   }
}
