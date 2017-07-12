'use strict';

const IssueModel = require('./../../models').e_issue;
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = class IssueAPI {
  static getIssues(cb) {
    IssueModel.findAndCountAll().then(result => {
      if (result.count > 0) return cb({ status: 200, data: result.rows });
      else if (result.count === 0) return cb({ status: 204, data: [] });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message });
    });
  }
  static getIssueByID(data, cb) {
    IssueModel.findById(data.id, { returning: true, plain: true }).then(result => {
      if (result === null) return cb({ status: 204, data: [] });
      return cb({ status: 200, data: result });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: err.message });
    });
  }
  static createIssue(session, data, cb) {
    IssueModel.create(data).then(data => {
      const issue = data.get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 1, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, issue);
      });
      return cb({ status: 201, data: issue });
    }).catch(err => {
      console.error(err.message);
      return cb({ status: 400, data: err.message });
    });
  }
  static updateIssue(session, data, cb) {
    IssueModel.update(data, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(data => {
      if (data[0] === 0) return cb({ status: 204, data: [] });
      const issue = data[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 11, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, issue);
      });
      return cb({ status: 200, data: issue });
    }).catch(err => {
      console.error(err.message);
      return cb({ status: 400, data: err.message });
    });
  }
  static deleteIssue(session, data, cb) {
    IssueModel.update({ isDeleted: true }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] });
      const issue = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, issue);
      })
      return cb({ status: 200, data: issue });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: null });
    });
  }
  static restoreIssue(session, data, cb) {
    IssueModel.update({ isDeleted: false }, {
      where: { id: data.id },
      returning: true,
      plain: true
    }).then(result => {
      if (result[0] === 0) return cb({ status: 204, data: [] });
      const issue = result[1].get({ plain: true });
      OperationAPI.createOperation({
        operationTypeID: 12, sessionID: session.sessionID
      }, (response) => {
        if (response.status === 201) LogAPI.logPerson(response.data.id, issue);
      })
      return cb({ status: 200, data: issue });
    }).catch(err => {
      console.error(err);
      return cb({ status: 500, data: null });
    });
  }
}
