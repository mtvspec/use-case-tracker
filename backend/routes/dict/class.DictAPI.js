'use strict';

const db = require('db');
const sql = require('./sql.js');

module.exports = class DictAPI {
  static getAllDicts(cb) {
    db.selectAllRecordsP({
      text: sql.dict.SELECT_ALL_DICTS()
    }).then((response) => {
      return cb(response);
    }, (err) => {
      return cb({ status: 500, data: null });
    });
  }
  static getDictValues(dictName, cb) {
    db.selectAllRecordsP({
      text: sql.dict.SELECT_DICT_VALUES_BY_DICT_NAME(dictName)
    }).then((response) => {
      return cb(response);
    }, (err) => {
      return cb({ status: 500, data: null });
    });
  }
  static createDictValue(dictValue, cb) {
    db.insertRecordP({
      text: sql.dict.INSERT_DICT_VALUE(dictValue)
    }).then((response) => {
      return cb(response);
    }, (err) => {
      return cb({ status: 500, data: null });
    });
  }
}
