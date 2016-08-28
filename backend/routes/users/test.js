'use strict';

let User = require('./class.User.js');

let user = new User({
  personID: 1,
  username: 'mtvspec',
  password: 'PASSWORD'
});

console.log(user);
