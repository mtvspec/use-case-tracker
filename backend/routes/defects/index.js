'use strict';

const router = require('express').Router();
const DefectAPI = require('./class.DefectAPI.js');

router
.get('/', function (req, res) {
  DefectAPI.getDefects(req, res);
})

module.exports = router;
