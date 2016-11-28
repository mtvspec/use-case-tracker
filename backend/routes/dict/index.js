'use strict';

const router = require('express').Router();
const DictAPI = require('./class.DictAPI.js');

router
.get('/use-case-slice-states', function (req, res) {
  DictAPI.getUseCaseSliceStates(req, res);
})
.get('/defect-states', function (req, res) {
  console.log(true);
  DictAPI.getDefectStates(req, res);
})

module.exports = router;
