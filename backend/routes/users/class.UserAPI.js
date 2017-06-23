'use strict';

const bcrypt = require('bcrypt-nodejs');
const SessionAPI = require('./sessions/class.SessionAPI.js');
const db = require('db');
const sql = require('./sql.js');

module.exports = class UserAPI {
  static getUsers(cb) {
    db.selectAllRecords({
      text: sql.users.SELECT_ALL_USERS()
    }, (response) => {
      if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });;
    });
  }
  static checkUsername(username, cb) {
    db.selectRecordById({
      text: sql.users.SELECT_USER_ID_BY_USERNAME(username)
    }, (response) => {
      if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  /**
   * @function getMe
   * @param {string} token
   * @return me
   */
  static getMe(userID, cb) {
    db.selectRecordById({
      text: sql.users.SELECT_USER_DATA_BY_ID(userID)
    }, (response) => {
      if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
	/**
  * @param user
  * @return user_id
  */
  static createUser(userData, session, cb) {
    userData.password = bcrypt.hashSync(userData.password);
    db.insertRecord({
      text: sql.users.INSERT_USER(userData, session.sessionID, session.userID)
    }, (response) => {
      if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  static getUserID(token, cb) {
    db.selectRecordById({
      text: sql.users.SELECT_USER_AND_SESSION_ID_BY_SESSION_TOKEN(token)
    }, (response) => {
      if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
  /**
   * @method authentificateUser
   * @param {Object} userCredentials (username & password)
   * if success
   * @return {Object} status(200) & and session token
   * else
   * @return {Object} status(400) & message('invalid password')
   * else
   * @return {Object} status(400) & messages
  */
  static authentificateUser(userData, cb) {
    db.selectRecordById({
      text: sql.users.SELECT_USER_ID_AND_PASSWORD_BY_USERNAME(userData.username)
    }, (response) => {
      if (response) {
        if (response && response.status === 200) {
          if (bcrypt.compareSync(userData.password, response.data.u_password)) {
            SessionAPI.openSession(response.data.id, (response) => {
              return cb(response);
            });
          } else return cb({ status: 400, data: 'invalid password' });
        } else return cb(response);
      } else return cb({ status: 500, data: null });
    });
  }
  static logOut(sessionID, cb) {
    SessionAPI.closeSession(sessionID, (response) => {
      if (response) return cb({ status: response.status, data: response.data });
      else return cb({ status: 500, data: null });
    });
  }
}