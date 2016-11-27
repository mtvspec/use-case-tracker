'use strict';

const router = require('express').Router();

router
.get('/', function (req, res) {
  return res
  .status(200)
  .send('Customers')
  .end();
})

module.exports = router;
