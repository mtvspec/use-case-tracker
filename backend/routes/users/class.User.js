'use strict';

const personAPI = require('./persons/class.personAPI.js');
const PersonAPI = new personAPI();

module.exports = class User {
  constructor(data) {
    let user = {};
    let messages = {};
    if (data) {
      if (data.personID) {
        if (data.personID
          && typeof data.personID === 'number'
          && data.personID > 0) {
          PersonAPI.selectPersonByID(data.personID, function (response) {
            if (response.status === 200) {
              user.personID = response.data.id;
            } else {
              messages.personID = `'personID': ${data.personID} not found`;
            }
          });
        } else {
          messages.personID = `incorrect 'personID:' ${data.personID}`;
        }
      } else {
        messages.personID = `'personID' is required`;
      }
      if (data.username) {
        if (typeof data.username === 'string'
        && data.username.length >= 3
        && data.username.length <= 20) {
          user.username = data.username;
        } else {
          messages.username = `incorrect 'username': ${data.username}`;
        }
      } else {
        messages.username = `'username' is required`;
      }
      if (data.password) {
        if (typeof data.password === 'string'
        && data.password.length > 0) {
          user.password = data.password;
        } else {
          messages.password = `incorrect 'password': ${data.password}`;
        }
      } else {
        messages.password = `'password' is required`;
      }
      if (Object.keys(messages).length > 0) {
        return this.messages = messages;
      } else {
        return this.user = user;
      }
    } else {
      messages.user = 'User data is required';
      return this.messages = messages;
    }
  }
}
