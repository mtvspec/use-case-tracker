'use strict';

const validator = require('indicative');
const router = require('express').Router();
const DictAPI = require('./class.DictAPI.js');

// comment

module.exports = router
.get('/', (req, res) => {
  DictAPI.getAllDicts((response) => {
    return res.status(response.status).json(response).end();
  });
})
.get('/:dict', (req, res) => {
  if (!validator.is.string(req.params.dict)) return res.status(400).end();
  else DictAPI.getDictValues(req.params.dict, (response) => {
    return res.status(response.status).json(response).end();
  });
})
.post('/', (req, res) => {
  if (!validator.is.object(req.body)) return res.status(400).end();
  else {
    const pattern = {
      id: 'required',
      aDictValueNameEN: 'required|string',
      aDictValueDescEN: 'string',
      aDictValueNameRU: 'required|string',
      aDictValueDescRU: 'string'
    }
    validator.validate(req.body, pattern).then((dictValue) => {
      if (dictValue.aDictValueDescEN === undefined) dictValue.aDictValueDescEN = null;
      if (dictValue.aDictValueDescRU === undefined) dictValue.aDictValueDescRU = null;
      DictAPI.createDictValue(dictValue, (response) => {
        return res.status(response.status).json(response.data).end();
      })
    }).catch((errors) => {
      console.error(errors);
      return res.status(400).json(errors).end();
    })
  }
})
