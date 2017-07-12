'use strict';

const router = require('express').Router();
const EmpAPI = require('./class.EmpAPI.js');

module.exports = router
.get('/', (req, res) => {
  EmpAPI.getEmps((response) => {
    return res.status(response.status).json(response.data).end();
  });
})