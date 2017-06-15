'use strict';

const validator = require('indicative');
const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class CustomerAPI {
  static getCustomers(cb) {
    db.selectAllRecords({
      text: sql.customers.SELECT_ALL_CUSTOMERS()
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    })
  }
  /***
  * @param customerData
  * @return customerID
  */
  static createCustomer(session, customerData, cb) {
    const pattern = {
      eOrganizationID: 'required',
      aCustomerName: 'required|string',
      aCustomerDesc: 'string'
    }
    validator.validate(customerData, pattern).then((customerData) => {
      customerData.dCustomerStateID = 44;
      db.insertRecord({
        text: sql.customers.INSERT_CUSTOMER(customerData)
      }, (response) => {
        if (response) return cb(response);
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return res.status({ status: 400, data: errors });
      else return res.status({ status: 500, data: null });
    })    
  }
  /***
  * @param customerData
  * @return customerID
  */
  static updateCustomer(session, customerData, cb) {
    const pattern = {
      id: 'required',
      eOrganizationID: 'required',
      aCustomerName: 'required|string',
      aCustomerDesc: 'string'
    }
    validator.validate(customerData, pattern).then((customerData) => {
      customerData.dCustomerStateID = 46;
      db.updateRecord({
        text: sql.customers.UPDATE_CUSTOMER(customerData)
      }, (response) => {
        if (response) return cb(response);
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return res.status({ status: 400, data: errors });
      else return res.status({ status: 500, data: null });
    })    
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
