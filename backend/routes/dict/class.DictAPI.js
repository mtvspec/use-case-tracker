'use strict';

const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class DictAPI {
  static getAllDicts(cb) {
    db.selectAllRecords({
      text: sql.dict.SELECT_ALL_DICTS()
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    })
  }
  static getDictValues(dictName, cb) {
    db.selectAllRecords({
      text: sql.dict.SELECT_DICT_VALUES_BY_DICT_NAME(dictName)
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    })
  }
  static createDictValue(dictValue, cb) {
    db.insertRecord({
      text: sql.dict.INSERT_DICT_VALUE(dictValue)
    }, (response) => {
      if (response) return cb(response);
      else return cb({ status: 500, data: null });
    })
  }
}
