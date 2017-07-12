'use strict';

const CustomerModel = require('./../../models').e_customer;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = class CustomerAPI {
  static getCustomers(cb) {
    CustomerModel.findAndCountAll().then(result => {
      if (result.count > 0) return cb({ status: 200, data: result.rows })
      else if (result.count === 0) return cb({ status: 204, data: [] })
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message })
    });
  }
  static getCustomerByID(data, cb) {
    CustomerModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return cb({ status: 204, data: [] });
      return cb({ status: 200, data: result });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message });
    });
  }
  /***
  * @param customerData
  * @return customerID
  */
  static createCustomer(session, data, cb) {
    CustomerModel.create(data).then(data => {
      const customer = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, customer);
      });
      return cb({ status: 201, data: customer });
    }).catch(err => {
      console.error(err.message);
      return cb({ status: 400, data: err.message });
    });
  }
  /***
  * @param customerData
  * @return customerID
  */
  static updateCustomer(session, data, cb) {
    CustomerModel.update(data, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return cb({ status: 204, data: [] });
      const customer = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, customer);
      });
      return cb({ status: 200, data: customer });
    }).catch(err => {
      console.error(err.message);
      return cb({ status: 400, data: err.message });
    });
  }
  /***
   * @param customerID
   * @return customerID
   */
  static deleteCustomer(session, data, cb) {
    CustomerModel.update({ isDeleted: true }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] });
      const customer = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, customer);
      })
      return cb({ status: 200, data: customer });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: null });
    });
  }
  static restoreCustomer(session, data, cb) {
    CustomerModel.update({ isDeleted: false }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] });
      const customer = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, customer);
      })
      return cb({ status: 200, data: customer });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: null });
    });
  }
}
