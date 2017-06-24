'use strict';

const db = require('db');
const sql = require('./sql.js');

module.exports = class OrganizationalUnitAPI {
  static getOrganizationalUnits(cb) {
    db.selectAllRecordsP({
      text: sql.organizationalUnits.SELECT_ALL_ORGANIZATIONAL_UNITS()
    }).then((response) => {
      return cb(response);
    }, (err) => {
      console.error(err);
      return cb(err);
    });
  }
  static getOrganizationalUnitByID(organizationalUnit, cb) {
    db.selectRecordById({
      text: sql.organizationalUnits.SELECT_ORGANIZATIONAL_UNIT_BY_ID(organizationalUnit)
    }, (response) => {
      return cb(response);
    });
  }
  static createOrganizationalUnit(organizationalUnit, cb) {
    db.insertRecordP({
      text: sql.organizationalUnits.INSERT_ORGANIZATIONAL_UNIT(organizationalUnit)
    }).then((response) => {
      return cb(response);
    }, (err) => {
      console.error(err);
      return cb(err);
    });
  }
  static updateOrganizationalUnit(organizationalUnit, cb) {
    db.updateRecordP({
      text: sql.organizationalUnits.UPDATE_ORGANIZATIONAL_UNIT(organizationalUnit)
    }).then((response) => {
      return cb(response);
    }, (err) => {
      return cb(err);
    });
  }
}