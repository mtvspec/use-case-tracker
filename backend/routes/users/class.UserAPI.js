'use strict';

const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid');
const ID = require('./../../common/classes/id');
const User = require('./class.User.js');
const SessionAPI = require('./sessions/class.SessionAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');
const sessionsSQL = require('./sessions/sql.js');

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
      SessionAPI.validateSessionByToken(token, function (response) {
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
  * @param username
  * @param password
  * @return user_id
  */
  static authentificateUser(req, res) {
    let user = new User(req.body);
    if (user.username && user.password) {
      console.log(bcrypt.hashSync(user.password));
      db.selectRecordById({
        text: sql.users.SELECT_USER(user)
      }, function(response) {
        if (response.status === 200) {
          let password = bcrypt.hashSync(user.password);
          if (bcrypt.compareSync(user.password, response.data.u_password)) {
            user.id = response.data.id;
            SessionAPI.openSession(user.id, function (response) {
              if (response.status === 201) {
                let session = {
                  id: response.data.open_session,
                  token: uuid.v4()
                };
                db.updateRecord({
                  text: sessionsSQL.sessions.SET_SESSION_TOKEN(
                    session.id,
                    session.token
                  )
                }, function (response) {
                  if (response) {
                    if (response.status === 200) {
                      return res
                      .status(200)
                      .cookie('session', session.token)
                      .end();
                    } else {
                      return res
                      .status(500)
                      .end();
                    }
                  } else {
                    return res
                    .status(500)
                    .end();
                  }
                });
              } else {
                return res
                .status(response.status)
                .json(response.data)
                .end();
              }
            });
          } else {
            return res
            .status(400)
            .json('wrong password')
            .end();
          }
        } else {
          return res
          .status(response.status)
          .json(response.data)
          .end();
        }
      });
    } else {
      return res
      .status(400)
      .json(user)
      .end();
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
