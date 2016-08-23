'use strict';

const router = require('express').Router();

const multer = require('multer');
const upload = multer();
const Database = require('./../../db.js');
const db = new Database();

const sql = require('./sql.js');

router
// GET projects
.get('/', function (req, res, next) {
  res.status(200).send('Projects').end();
})

module.exports = router;
