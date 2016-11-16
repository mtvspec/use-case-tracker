'use strict';

function isValidUser(data) {
  if (data) {
    let user = {};
    let messages = {};
    if (data.personID) {
      if (Number.isInteger(data.personID)) {
        user.personID = data.personID;
      } else {
        messages.personID = `incorrect 'personID': ${data.personID}`;
      }
    } else {
      messages.personID = `'personID' is required`;
    }
    if (data.username) {
      if (typeof data.username === 'string') {
        user.username = data.username;
      } else {
        messages.username = `incorrect 'username': ${data.username}`;
      }
    } else {
      messages.username = `'username' is required`;
    }
    if (data.password) {
      if (typeof data.password === 'string') {
        user.password = data.password;
      } else {
        messages.password = `incorrect 'password': ${data.password}`;
      }
    } else {
      messages.password = `'password' is required`;
    }
    if (Object.keys(messages).length > 0) {
      return {
        result: false,
        data: messages
      }
    } else {
      User.checkPersonIDAndUsername(user, function (response) {
        if (response.status === 200) {
          if (response.data) {

          }
        }
      });
      return new User(user);
    }
  } else {
    messages.data = `'user' is required`;
    return {
      result: false,
      data: messages
    }
  }
}

function checkUsername (username) {
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
      return false;
    } else if (response.status === 204) {
      return true;
    }
  });
}

let p = new Promise(function(resolve, reject) {
  resolve('success');
  reject('error');
});

p.then(function (data) {
  console.log(data);
}, function (error) {
  console.log(error);
});

console.log(p);

class User {
  constructor(data) {
    let user = {};
    if (isValidUsername(data.username)) {
      user.username = data.username;
    } else {
      messages.username = 'correct username required';
    }
    if (isValidPassword(data.password)) {
      user.password = data.password;
    } else {
      messages.password = `correct password required`;
    }
    return this.user = user;
  }
}

function isValidUsername(username) {
  if (username) {
    if (typeof username === 'string') {
      return true;
    }
  }
  return false;
}

function isValidPassword(password) {
  if (password) {
    if (typeof password === 'string') {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

let u = new User({
  username: 'mtvspec',
  password: 'password'
});

console.log(u);
