var express = require('express');
var router = express.Router();

const UseCaseSliceAPI = require('./class.UseCaseSliceAPI.js');

router
.get('/', function(req, res) {
  UseCaseSliceAPI.getSlices(req, res);
})
.put('/:id', function(req, res) {
  if (!req.id) {
    return res
    .status(400)
    .end();
  } else {
    UseCaseSliceAPI.updateSlice(req, res);
  }
})

module.exports = router;