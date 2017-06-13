'use strict';

const validate = require('indicative');
const Pool = require('pg').Pool;
const pool = new Pool();

pool.on('error', function (err) {
  if (err) {
    console.error(`
      'db':
      'pool':\n
      'error':\n`, {
        err: err,
        stack: err.stack
      }
    );
  }
});
/**
 * @error codes:
 * 23502 - not_null_violation
 * 23503 - foreign_key_violation
 * 23505 - unique_violation
 * 23514 - check_violation
 */
module.exports = class Database {
  static selectAllRecords(config, cb) {
    if (!validate.is.object(config)) return cb({ status: 400, data: 'query config is required' });
    if (!validate.is.string(config.text)) return cb({ status: 400, data: 'query text is required' });
    pool.connect(function (err, client, release) {
      if (err) {
        release();
        console.error(err);
        return cb({ status: 500, data: err.message });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            release();
            console.error(err);
            return cb({ status: 500, data: err.message });
          } else {
            release();
            if (result.rowCount > 0) return cb({ status: 200, data: result.rows });
            else {
              if (result.rowCount === 0) return cb({ status: 204, data: [] });
              else return cb({ status: 500, data: err.message });
            }
          }
        });
      }
    });
  }
  static selectRecordById(config, cb) {
    if (!validate.is.object(config)) return cb({ status: 400, data: 'query config is required' });
    if (!validate.is.string(config.text)) return cb({ status: 400, data: 'query text is required' });
    pool.connect(function (err, client, release) {
      if (err) {
        release();
        console.error(err);
        return cb({ status: 500, data: err.message });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            release();
            console.error(err);
            return cb({ status: 500, data: err.message });
          } else {
            release();
            if (result.rowCount === 1) return cb({ status: 200, data: result.rows[0] });
            else if (result.rowCount === 0) return cb({ status: 204, data: [] });
            else return cb({ status: 500, data: err.message });
          }
        });
      }
    });
  }
  static insertRecord(config, cb) {
    if (!validate.is.object(config)) return cb({ status: 400, data: 'query config is required' });
    if (!validate.is.string(config.text)) return cb({ status: 400, data: 'query text is required' });
    pool.connect(function (err, client, release) {
      if (err) {
        release();
        console.error(err);
        return cb({ status: 500, data: err.message });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            release();
            console.error(err);
            if (err.code === '23502' || err.code === '23503' || err.code === '23505' || err.code === '23514') return cb({ status: 400, data: err.detail });
            else return cb({ status: 500, data: err.detail });
          } else {
            release();
            if (result.rowCount === 1) return cb({ status: 201, data: result.rows[0] });
            else return cb({ status: 500, data: err.message });
          }
        });
      }
    });
  }
  static updateRecord(config, cb) {
    if (!validate.is.object(config)) return cb({ status: 400, data: 'query config is required' });
    if (!validate.is.string(config.text)) return cb({ status: 400, data: 'query text is required' });
    pool.connect(function (err, client, release) {
      if (err) {
        release();
        console.error(err);
        return cb({ status: 500, data: err.message });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            release();
            console.error(err);
            if (err.code === '23502' || err.code === '23503' || err.code === '23505' || err.code === '23514') return cb({ status: 400, data: err.detail });
            else return cb({ status: 500, data: err.detail });
          } else {
            release();
            if (result.rowCount === 1) return cb({ status: 200, data: result.rows[0] });
            else if (result.rowCount > 1) return cb({ status: 500, data: 'Result set have more then 1 row' });
            else return cb({ status: 500, data: err.message });
          }
        });
      }
    });
  }
}