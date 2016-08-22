'use strict';

const Pool = require('pg').Pool;
const pool = new Pool();

module.exports = class Database {
    constructor() {
  }
  selectAllRecords(config, cb) {
    pool.on('error', function (err) {
      if (err) {
        console.error(err);
        return cb(500);
      }
    });
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
    pool.on('error', function (err) {
      if (err) {
        console.error(err);
        return cb(500);
      }
    });
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
  updateRecord(config, cb) {
    pool.on('error', function (err) {
      console.error(err);
      return cb(500);
    });
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
    pool.on('error', function (err) {
      console.error(err);
      return cb(500);
    });
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
