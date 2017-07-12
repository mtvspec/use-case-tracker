'use strict';

const router = require('express').Router();
const UseCaseAPI = require('./class.UseCaseAPI.js');

router
.get('/', function (req, res) {
  UseCaseAPI.getUseCases(req, res);
})

module.exports = router;
