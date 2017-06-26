'use strict';

const router = require('express').Router();
const CustomerAPI = require('./class.CustomerAPI.js');

module.exports = router
.get('/', (req, res) => {
  CustomerAPI.getCustomers((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  CustomerAPI.getCustomerByID({ id: req.params.id }, (response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.post('/', (req, res) => {
  CustomerAPI.createCustomer(req.session, req.body, (response) => {
    if (response.status === 201) res.io.emit('createdCustomerID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  CustomerAPI.updateCustomer(req.session, req.body, (response) => {
    if (response.status === 201) res.io.emit('updatedCustomerID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.delete('/:id', (req, res) => {
  CustomerAPI.deleteCustomer(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('deletedCustomerID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
})
.options('/:id', (req, res) => {
  CustomerAPI.restoreCustomer(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('restoredCustomerID', response.data.id);
    return res.status(response.status).json(response.data).end();
  });
});