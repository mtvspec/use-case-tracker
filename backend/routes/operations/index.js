'use strict';

const router = require('express').Router();
const OperationAPI = require('./class.OperationAPI.js');

module.exports = router
.get('/', (req, res) => {
  OperationAPI.getAllOperations((response) => {
    return res.status(response.status).json(response.data).end();
  });
})