'use strict';

const bcrypt = require('bcrypt-nodejs');

/**
 * @desc This function takes user's credentials (username and password) and
 * validates it (for availability). If username is available and valid
 * function creates new User and return it.
 * @param credentials
 * @return User
 */
module.exports = class User {
  constructor(data) {
    let User = {};
    let messages = {};
    let result = {};
    if (!data) {
      messages.message = `'user data' is required`;
      return this.result = messages;
    } else {
      if (data.username) {
        if (checkUsername(data.username)) {
          User.username = data.username;
        } else {
          messages.username = `invalid username: '${data.username}'`;
        }
      } else {
        messages.username = `'username' is required`;
      }
      if (data.password) {
        if (checkPassword(data.password)) {
          User.password = data.password;
        } else {
          messages.password = `invalid password: '${data.password}'`;
        }
      } else {
        messages.password = `'password' is required`;
      }
      if (Object.keys(messages).length > 0) {
        return this.result = messages;
      } else {
        return this.result = User;
      }
    }
  }
}

function createUser(User) {
  if (!User) {
    return false;
  } else {
    return true;
  }
}

function checkUsername(username) {
  if (!username) {
    return false;
  } else {
    if (typeof username === 'string' && username.length > 6) {
      // TODO: check username availability
      return true;
    } else {
      return false;
    }
  }
}

function checkPassword(password) {
  if (!password) {
    return false;
  } else {
    if (typeof password === 'string' && password.length > 6) {
      return true;
    } else {
      return false;
    }
  }
}
