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
  UserAPI.authentificateUser(req, res);
})
.post('/logout', function (req, res) {
  UserAPI.logOut(req, res);
});

module.exports = router;
