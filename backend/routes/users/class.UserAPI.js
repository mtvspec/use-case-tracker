'use strict';

const bcrypt = require('bcrypt-nodejs');
const ID = require('./../../common/classes/id');
const User = require('./class.User.js');
const SessionAPI = require('./sessions/class.SessionAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class UserAPI {
  constructor() {

  }
  static getUsers(req, res) {
    db.selectAllRecords({
      text: sql.users.SELECT_ALL_USERS()
    }, function (response) {
      if (response && response.status) {
        return res
        .status(response.status)
        .json(response.data)
        .end();
      } else {
        return res
        .status(500)
        .end();
      }
    });
  }
  static checkUsername (req, res) {
    db.selectRecordById({
      text: sql.users.SELECT_USER_ID_BY_USERNAME(req.body.username)
    }, function (response) {
      if (response && response.status === 200) {
        return res
        .status(400)
        .json({
          username: `'username': '${req.body.username}' is unavailable`
        })
        .end();
      } else if (response && response.status === 204) {
        return res
        .status(200)
        .end();
      }
    });
  }
  /***
   * @function getMe
   * @param token
   * @return me
   */
  static getMe(req, res) {
    if (req.cookies.session) {
      let token = req.cookies.session;
      UserAPI.getUserID(token, function (response) {
        if (response && response.status === 200) {
          let session = {
            sessionID: response.data.sessionID,
            userID: response.data.userID
          };
          db.selectRecordById({
            text: sql.users.SELECT_USER_DATA_BY_ID(session.userID)
          }, function (response) {
            if (response && response.status === 200) {
              return res
              .status(200)
              .json(response.data)
              .end();
            } else {
              return res
              .json(response.data)
              .end();
            }
          });
        } else {
          return res
          .status(500)
          .end();
        }
      });
    } else {
      return res
      .status(401)
      .end();
    }
  }
  /***
  * @param user
  * @return user_id
  */
  static createUser(req, res) {
    let user = new User(req.body);
    if (user.username && user.password) {
      db.insertRecord({
        text: sql.users.INSERT_USER (
          user,
          req.User
        )
      }, function(response) {
        return cb(response)
      });
    } else {
      return res
      .status(400)
      .json(user)
      .end();
    }
  }
  static getUserID(token, cb) {
    db.selectRecordById({
      text: sql.users.SELECT_USER_AND_SESSION_ID_BY_SESSION_TOKEN(token)
    }, function(response) {
      return cb(response);
    });
  }
  /***
   * @function authentificateUser
   * @param userCredentials (username & password)
   * if success
   * @return status(200) & and session token
   * else
   * @return status(400) & message('invalid password')
   * else
   * @return status(400) & messages
  */
  static authentificateUser(userData, cb) {
    let userDataValidationResult = new User(userData);
    if (userDataValidationResult.User) {
      let User = userDataValidationResult.User;
      db.selectRecordById({
        text: sql.users.SELECT_USER_ID_AND_PASSWORD_BY_USERNAME(User.username)
      }, function(response) {
        if (response.status === 200) {
          let password = bcrypt.hashSync(User.password);
          if (bcrypt.compareSync(User.password, response.data.u_password)) {
            let session = {
              userID: response.data.id,
              token: uuid()
            }
            SessionAPI.openSession(session, function (response) {
              if (response && response.status === 201) {
                session.id = response.data.open_session;
                session.state = 'O';
                Sessions.push(session);
                return cb({
                  status: 200,
                  data: session.token
                });
              } else {
                return cb({
                  status: response.status,
                  data: response.data
                });
              }
            });
          } else {
            return cb({
              status: 400,
              data: 'invalid password'
            });
          }
        } else {
          return cb({
            status: response.status,
            data: response.data
          });
        }
      });
    } else {
      return cb({
        status: 400,
        data: userDataValidationResult.messages
      });
    }
  }
  static logOut(req, res) {
    SessionAPI.closeSession(req.cookies.session, function (response) {
      if (response && response.status === 200) {
        return res
        .clearCookie('session')
        .end();
      } else {
        return res
        .status(response.status)
        .json(response.data)
        .end();
      }
    });
  }
}
