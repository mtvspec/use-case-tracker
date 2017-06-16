'use strict';

const router = require('express').Router();

module.exports = router
.get('/', (req, res) => {
  return res.status(200).json('Issues').end();
})