'use strict';

const ID = require('./../../common/classes/id');
const User = require('./class.User.js');
const Database = require('./../../db.js');
const db = new Database();
const sql = require('./sql.js');

class UserAPI {
  constructor() {
    let instance = this;
    if (instance) {
      return instance;
    }
  }
  /***
  * @param user_id
  * @param user
  * @return user_id
  */
  createUser(req, res) {
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
  authentificateUser(req, res) {
    let user = new User(req.body);
    if (user.username && user.password) {
      db.selectRecordById({
        text: sql.users.SELECT_USER ({
          user
        });
      }, function(response) {
        if (response.status === 200) {
          openSession(user, function (response) {
            if (response.status === 201) {
              return res.status(200).json({
                id: response.data.open_session
              });
            } else {
              return res.status(response.status).json(response.data).end();
            }
          });
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    } else {
      return res.status(400).json(user).end();
    }
  }
}
