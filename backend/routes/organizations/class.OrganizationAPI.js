'use strict';

////////////////////////////////////////////////////////////////////////////////

const OrganizationModel = require('./../../models').e_organization;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

////////////////////////////////////////////////////////////////////////////////

module.exports = class OrganizationAPI {
  static getOrganizations(cb) {
    OrganizationModel.findAndCountAll().then(result => {
      if (result.count > 0) return cb({ status: 200, data: result.rows })
      else if (result.count === 0) return cb({ status: 204, data: [] })
    }).catch(err => {
      console.error(err)
      return cb({ status: 500, data: err.message })
    })
  }
  static getOrganizationByID(data, cb) {
    OrganizationModel.findById(data.id).then(result => {
      if (result === null) return cb({ status: 204, data: [] })
      return cb({ status: 200, data: result })
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message })
    })
  }
  static createOrganization(session, data, cb) {
    OrganizationModel.create(data).then(data => {
      const organization = data.get({ plain: true })
      OperationAPI.createOperation({
        operationTypeID: 49, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logOrganization(response.data.id, organization)
      });
      return cb({ status: 201, data: organization })
    }).catch(err => {
      console.error(err.message)
      return cb({ status: 400, data: err.message })
    })
  }
  static updateOrganization(session, data, cb) {
    OrganizationModel.update(data, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return cb({ status: 204, data: [] })
      const organization = data[1].get({ plain: true })
      OperationAPI.createOperation({
        operationTypeID: 151, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logOrganization(response.data.id, organization)
      });
      return cb({ status: 200, data: organization })
    }).catch(err => {
      console.error(err.message)
      return cb({ status: 400, data: err.message })
    })
  }
  static deleteOrganization(session, data, cb) {
    OrganizationModel.update({ isDeleted: true }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] })
      const organization = result[1].get({ plain: true })
      OperationAPI.createOperation({
        operationTypeID: 152, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logOrganization(response.data.id, organization)
      })
      return cb({ status: 200, data: organization })
    }).catch(err => {
      console.error(err)
      return cb({ status: 500, data: null })
    })
  }
  static restoreOrganization(session, data, cb) {
    OrganizationModel.update({ isDeleted: false }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] })
      const organization = result[1].get({ plain: true })
      OperationAPI.createOperation({
        operationTypeID: 153, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logOrganization(response.data.id, organization)
      })
      return cb({ status: 200, data: organization })
    }).catch(err => {
      console.error(err)
      return cb({ status: 500, data: null });
    })
  }
}