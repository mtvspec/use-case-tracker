'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const upload = multer();
const persons = require('./persons.js');

app.use(multer);

process.on('error', function (err) {
  console.error(err);
});

app.use('/api/persons', persons);
app.use(function (err, req, res, next) {
  console.log('request');
  console.error(err);
  res.status(500).end();
});
app.listen(3000);
