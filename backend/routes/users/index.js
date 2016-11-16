var express = require('express');
var router = express.Router();

const UserAPI = require('./class.UserAPI.js');

router
.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.get('/:id', function (req, res) {
})
.post('/username', function (req, res) {
  UserAPI.checkUsername(req, res);
})
.post('/', function (req, res) {
  UserAPI.createUser(req, res);
})
.post('/login', function (req, res) {
  UserAPI.authentificateUser(req, res);
})
.post('/logout', function (req, res) {
  UserAPI.logOut(req, res);
})

module.exports = router;
