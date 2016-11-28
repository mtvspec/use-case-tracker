'use strict';

const router = require('express').Router();
const CustomerAPI = require('./class.CustomerAPI');

router
.get('/', function (req, res) {
  CustomerAPI.getCustomers(req, res);
})

module.exports = router;
