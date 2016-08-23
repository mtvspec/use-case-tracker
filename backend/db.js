'use strict';

const Pool = require('pg').Pool;
const pool = new Pool();

pool.on('error', function (err) {
  if (err) {
    console.error(err);
    return cb(500);
  }
});

module.exports = class Database {
    constructor() {
      let instance = this;
      if (instance) {
        return instance;
      }
  }
  selectAllRecords(config, cb) {
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb(500);
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            console.error(err);
            return cb(500);
          } else {
            release();
            if (result.rowCount > 0) {
              return cb(200, result.rows)
            } else {
              if (result.rowCount === 0) {
                return cb(204);
              } else {
                console.error(result);
                return cb(500);
              }
            }
          }
        })
      }
    });
  }
  selectRecordById(config, cb) {
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb(500);
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            console.error(err);
            return cb(500);
          } else {
            release();
            if (result.rowCount === 1) {
              return cb(200, result.rows[0]);
            } else if (result.rowCount === 0) {
              return cb(204);
            } else {
              console.error(result);
              return cb(500);
            }
          }
        })
      }
    });
  }
  insertRecord(config, cb) {
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb(500);
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            console.error(err);
            return cb(500);
          } else {
            release();
            if (result.rowCount === 1) {
              return cb(201, result.rows[0]);
            } else {
              console.error(result);
              return cb(500);
            }
          }
        })
      }
    });
  }
  updateRecord(config, cb) {
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb(500);
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            if (err.code === '23505') {
              return cb(400, err.detail);
            }
            console.error(err);
            return cb(err.code, err.detail);
          } else {
            release();
            if (result.rowCount === 1) {
              return cb(200, result.rows[0]);
            } else {
              console.error(result);
              return cb(500);
            }
          }
        });
      }
    });
  }
}
