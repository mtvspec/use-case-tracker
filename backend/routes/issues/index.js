'use strict';

const router = require('express').Router();
const IssueAPI = require('./class.IssueAPI.js');

module.exports = router
.get('/', (req, res) => {
  IssueAPI.getIssues((response) => {
    return res.status(response.status).json(response.data).end();
  });
})
.get('/:id', (req, res) => {
  IssueAPI.getIssueByID({ id: req.params.id }, (response) => {
    return res.status(response.status).json(response.data).end();
  })
})
.post('/', (req, res) => {
  IssueAPI.createIssue(req.session, req.body, (response) => {
    if (response.status === 201) res.io.emit('createdIssueID', response.data.id);
    return res.status(response.status).json(response.data).end();
  })
})