'use strict';

const db = require('db');
const sql = require('./sql.js');

module.exports = class UseCaseSliceAPI {
  static getSlices (req, res) {
    db.selectAllRecords({
      text: sql.slices.SELECT_ALL_SLICES()
    }, function (responce){
      return res
      .status(responce.status)
      .json(responce.data)
      .end();
    });
  }
  static updateSlice(req, res) {
    if (req.body) {
      let sliceData = new UseCaseSlice(req.body);
      if (req.id) {
        sliceData.id = req.id;
      }
      if (sliceData.messages) {
        return res
        .status(400)
        .json(slice.messages)
        .end();
      } else if (sliceData.sliceName) {
        db.updateRecord({
          text: sql.slices.UPDATE_SLICE(sliceData)
        }, function (responce) {
          if (responce) {
            if (responce.status === 200) {
              return res
              .status(responce.status)
              .json(responce.data)
              .end();
            } else {
              return res
              .status(responce.status)
              .end();
            }
          }
        })
      }
    }
  }
}

function isString(string, minLength, maxLength) {
  if (!string) {
    return false;
  } else if (
    typeof string === 'string'
    && string.length >= minLength
    && string.length <= maxLength
  ) {
    return true;
  } else {
    return false;
  }
}