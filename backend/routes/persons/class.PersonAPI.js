'use strict';

////////////////////////////////////////////////////////////////////////////////

const PersonModel = require('./../../models').e_person;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

////////////////////////////////////////////////////////////////////////////////

module.exports = class PersonAPI {
  static getPersons(cb) {
    PersonModel.findAndCountAll().then(result => {
      if (result.count > 0) return cb({ status: 200, data: result.rows });
      else if (result.count === 0) return cb({ status: 204, data: [] });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message });
    });
  }
  static getPersonByID(data, cb) {
    PersonModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return cb({ status: 204, data: [] });
      return cb({ status: 200, data: result });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message });
    });
  }
  static createPerson(session, data, cb) {
    PersonModel.create(data).then(data => {
      const person = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      });
      return cb({ status: 201, data: person });
    }).catch(err => {
      console.error(err.message);
      return cb({ status: 400, data: err.message });
    });
  }
  static updatePerson(session, data, cb) {
    PersonModel.update(data, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return cb({ status: 204, data: [] });
      const person = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      });
      return cb({ status: 200, data: person });
    }).catch(err => {
      console.error(err.message);
      return cb({ status: 400, data: err.message });
    });
  }
  static deletePerson(session, data, cb) {
    PersonModel.update({ isDeleted: true }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] });
      const person = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      })
      return cb({ status: 200, data: person });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: null });
    });
  }
  static restorePerson(session, data, cb) {
    PersonModel.update({ isDeleted: false }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] });
      const person = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, person);
      })
      return cb({ status: 200, data: person });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: null });
    });
  }
}