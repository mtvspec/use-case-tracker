'use strict';

const ID = require('./../../common/classes/id');
const Defect = require('./class.Defect.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

class DefectAPI {
  constructor() {

  }
  static getDefects(req, res) {
    db.selectAllRecords({
      text: sql.defects.SELECT_ALL_DEFECTS(req.User)
    }, function (response) {
      if (response) {
        if (response.status) {
          if (response.status === 200) {
            return res.status(status).json(response.data).end();
          } else if (response.status === 204) {
            return res.status(response.status).end();
          } else {
            return res.status(500).end();
          }
        }
      }
    });
  }
}
