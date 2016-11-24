'use strict';

const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid');
const ID = require('./../../common/classes/id');
const User = require('./class.User.js');
const SessionAPI = require('./sessions/class.SessionAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class UserAPI {
  constructor() {

  }
  static checkUsername (req, res) {
    db.selectRecordById({
      text: `
      SELECT
        id
      FROM
        users.e_user
      WHERE
        u_username = '${req.body.username}';`
    }, function (response) {
      if (response.status === 200) {
        return res.status(400).json({
          username: `'username': '${req.body.username}' is unavailable`
        }).end();
      } else if (response.status === 204) {
        return res.status(200).json({
          username: `'username': '${req.body.username}' is available`
        }).end();
      }
    });
  }
  /***
  * @param user_id
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
        if (response.status === 201) {
          return res.status(response.status).json({
            id: response.data.create_user
          }).end();
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    } else {
      return res.status(400).json(user).end();
    }
  }
  /***
  * @param username
  * @param password
  * @return user_id
  */
  static authentificateUser(req, res) {
    let user = new User(req.body);
    console.log(user);
    if (user.username && user.password) {
      db.selectRecordById({
        text: sql.users.SELECT_USER(user)
      }, function(response) {
        if (response.status === 200) {
          let password = bcrypt.hashSync(user.password);
          if (bcrypt.compareSync(user.password, response.data.u_password)) {
            user.id = response.data.id;
            SessionAPI.openSession(user.id, function (response) {
              if (response.status === 201) {
                var session = {
                  token: uuid.v4()
                };
                db.updateRecord({
                  text: `
                  UPDATE
                    sessions.e_session
                  SET
                    token = '${session.token}'
                  WHERE
                    id = ${response.data.open_session}
                  RETURNING
                    id;`
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
                return res.status(response.status).json(response.data).end();
              }
            });
          } else {
            return res.status(400).json('wrong password').end();
          }
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    } else {
      return res.status(400).json(user).end();
    }
  }
  static logOut(req, res) {
    SessionAPI.closeSession(req.cookies.session, function (response) {
      return res
      .status(response.status)
      .json(response.data)
      .end();
    });
  }
}
