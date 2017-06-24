'use strict';

const SessionModel = require('./../../../models').e_session;
const uuid = require('uuid');
const db = require('db');
const sql = require('./sql.js');
let Sessions = require('./Sessions.js');

module.exports = class SessionAPI {
  constructor() {
    let instance = this;

    if (instance) return instance;
    else return this;
  }
  /***
   * @function openSession
   * @param userID
   * @return cb
  */
  static openSession(userID, cb) {
    let sessionData = {
      eUserID: userID,
      aToken: uuid()
    };
    SessionModel.create(sessionData).then(data => {
      const session = data.get({ plain: true });
      console.log(session);
      Sessions.push(session);
      return cb({ status: 201, data: session.aToken });
    }, (err) => {
      return cb({ status: 500, data: err.message });
    });
  }
  /***
   * @function closeSession
   * @param token
   * @return cb
  */
  static closeSession(id, cb) {
    SessionModel.update({
      closedAt: 'now()',
      dSessionStateID: 'C'
    }, {
        where: {
          id: id
        },
        returning: true,
        plain: true
      }).then(data => {
        const session = data[1].get({ plain: true });
        for (let i in Sessions) {
          if (Sessions[i].id === id) {
            Sessions.splice(i, 1);
            break;
          }
        }
        return cb({ status: 200, data: session.id });
      }, (err) => {
        console.error(err);
        return cb({ status: 500, data: err.message });
      });
  }
}