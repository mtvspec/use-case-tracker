'use strict';

const router = require('express').Router();
const System = require('./class.System.js');
const SystemAPI = require('./class.SystemAPI.js');

router
.get('/', function (req, res) {
  SystemAPI.getSystems(req, res);
})
.post('/', function (req, res) {
  SystemAPI.createSystem(req, res);
})

module.exports = router;
