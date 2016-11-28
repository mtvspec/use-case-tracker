'use strict';

const router = require('express').Router();
const UseCaseSubjectAPI = require('./class.UseCaseSubjectAPI.js');

router
.get('/', function (req, res) {
  UseCaseSubjectAPI.getSubjects(req, res);
})

module.exports = router;
