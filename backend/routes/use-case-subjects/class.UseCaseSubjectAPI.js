'use strict';

const UseCaseSubject = require('./class.UseCaseSubject.js');
const UserAPI = require('./../users/class.UserAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');


module.exports = class UseCaseSubjectAPI {
  constructor() {

  }
  static getSubjects(req, res) {
    db.selectAllRecords({
      text: sql.useCaseSubjects.SELECT_ALL_SUBJECTS()
    }, function (response) {
      if (response && response.status === 200) {
        return res
        .status(200)
        .json(response.data)
        .end();
      } else {
        return res
        .status(response.status)
        .end();
      }
    })
  }
  static createUseCaseSubject(req, res) {
    let result = new UseCaseSubject(req.body);
    let token = req.cookies.session;
    if (!token) {
      return res
      .status(401)
      .end();
    } else {
      if (result.useCaseSubject) {
        let useCaseSubject = result.useCaseSubject;
        UserAPI.getUserID(token, function (response) {
          console.log(response);
          if (response && response.status === 200) {
            db.insertRecord({
              text: sql.useCaseSubjects.INSERT_SUBJECT(
                useCaseSubject,
                {id: response.data.sessionID},
                {id: response.data.userID}
              )
            }, function (response) {
              if (response && response.status === 201) {
                return res
                .status(201)
                .json({id: response.data.create_use_case_subject})
                .end();
              } else {
                return res
                .status(500)
                .end();
              }
            })
          } else {
            return res
            .status(401)
            .end();
          }
        })
      } else {
        return res
        .status(400)
        .json(result.messages)
        .end();
      }
    }
  }
}
