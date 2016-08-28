var express = require('express');
var router = express.Router();

const UserAPI = require('./class.UserAPI.js');
const api = new UserAPI();

router
.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.get('/:id', function (req, res) {
})
.post('/', function (req, res) {
  api.createUser(req, res);
})
.post('/authentificateUser', function (req, res) {
  api.authentificateUser(req, res);
})

module.exports = router;
