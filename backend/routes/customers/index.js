'use strict';

const router = require('express').Router();
const CustomerAPI = require('./class.CustomerAPI.js');

module.exports = router
.get('/', (req, res) => {
  CustomerAPI.getCustomers((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  CustomerAPI.createCustomer(req.session, req.body, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  CustomerAPI.updateCustomer(req.session, req.body, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
