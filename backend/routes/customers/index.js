'use strict';

const router = require('express').Router();
const CustomerAPI = require('./class.CustomerAPI.js');

router
.get('/', function (req, res) {
  CustomerAPI.getCustomers(req, res);
})
.post('/', function (req, res) {
  console.log(req.body);
  CustomerAPI.createCustomer(req, res);
})

module.exports = router;
