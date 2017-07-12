'use strict';

const router = require('express').Router();
const ComponentAPI = require('./class.ComponentAPI');

router
.get('/', function (req, res) {
  ComponentAPI.getComponents(req, res);
})

module.exports = router;
