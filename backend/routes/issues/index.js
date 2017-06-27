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
.put('/:id', (req, res) => {
  IssueAPI.updateIssue(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('updatedIssueID', response.data.id);
    return res.status(response.status).json(response.data).end();
  })
})
.delete('/:id', (req, res) => {
  IssueAPI.deleteIssue(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('deletedIssueID', response.data.id);
    return res.status(response.status).json(response.data).end();
  })
})
.options('/:id', (req, res) => {
  IssueAPI.restoreIssue(req.session, { id: req.params.id }, (response) => {
    if (response.status === 200) res.io.emit('restoredIssueID', response.data.id);
    return res.status(response.status).json(response.data).end();
  })
})