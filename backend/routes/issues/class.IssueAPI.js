'use strict';

const validator = require('indicative');
const db = require('db');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

let issues = [];

module.exports = class IssueAPI {
  static getIssues(cb) {
    if (issues.length > 0) return cb({ status: 200, data: issues });
    else return cb({ status: 204, data: [] });
  }
  static getIssueByID(issue, cb) {
    let isFound = false;
    for (let i in issues) {
      if (issues[i].id == issue.id) {
        isFound = true;
        return cb({ status: 200, data: issues[i] });
      }
    }
    if (isFound === false) return cb({ status: 204, data: [] });
  }
  static createIssue(session, data, cb) {
    const pattern = {
      eIssueAuthorID: 'required',
      dIssueTypeID: 'required',
      aIssueName: 'required|string|min:2|max:1000',
      aIssueDesc: 'string|min:2'
    }
    validator.validateAll(data, pattern).then((issue) => {
      db.insertRecord({
        text: sql.issues.INSERT_ISSUE(issue)
      }, (response) => {
        if (response.status === 201) {
          const issue = response.data;
          issues.push(issue);
          OperationAPI.createOperation({
            operationTypeID: 134, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logIssue(response.data.id, issue);
          });
          return cb({ status: response.status, data: response.data });
        } else if (response) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
}

function _getIssues() {
  db.selectAllRecords({
    text: sql.issues.SELECT_ALL_ISSUES()
  }, (response) => {
    if (response.status === 200) {
      for (let i in response.data) {
        issues.push(response.data[i]);
      }
    } else return issues;
  });
}

_getIssues();