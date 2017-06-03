var express = require('express');
var router = express.Router();

const UserAPI = require('./class.UserAPI.js');

router
.get('/', function (req, res) {
  UserAPI.getUsers(req, res);
})
.get('/:id', function (req, res) {
})
.post('/profile', function (req, res) {
  console.log('me');
  UserAPI.getMe(req, res);
})
.post('/username', function (req, res) {
  UserAPI.checkUsername(req, res);
})
.post('/', function (req, res) {
  UserAPI.createUser(req, res);
})
.post('/login', function (req, res) {
  /***
   * @function authentificateUser
   * @param UserCredentials {username & password}
   * if success
   * @return status(200) & set session cookie (token)
   * else
   * @return status(400) - message(invalid password)
   * else
   * @return status(400) - messages
   * else
   * @return status(500) - error
   */
  UserAPI.authentificateUser(req.body, function (response) {
    if (response && response.status === 200) {
      return res
      .status(response.status)
      .cookie('session', response.data)
      .end();
    } else {
      return res
      .status(response.status)
      .json(response.data)
      .end();
    }
  });
})
.post('/logout', function (req, res) {
  UserAPI.logOut(req, res);
});

module.exports = router;
