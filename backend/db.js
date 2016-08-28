'use strict';

const Pool = require('pg').Pool;
const pool = new Pool();

pool.on('error', function (err) {
  if (err) {
    console.error(err);
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
    if (!config) {
      throw new Error(`
        'selectAllRecords':
        'config' is required`);
      return;
    }
    if (!config.text) {
      throw new Error(`'
        selectAllRecords':
        'config.text' is required`);
      return;
    }
    if (!typeof config.text === 'string') {
      throw new Error(`'
        selectAllRecords':
        incorrect 'config.text':
        ${config.text}`);
      return;
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb({
          status: 500,
          data: null
        });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            console.error(err);
            return cb({
              status: 500,
              data: null
            });
          } else {
            release();
            if (result.rowCount > 0) {
              return cb({
                status: 200,
                data: result.rows
              })
            } else {
              if (result.rowCount === 0) {
                return cb({
                  status: 204,
                  data: null
                });
              } else {
                console.error(result);
                return cb({
                  status: 500,
                  data: null
                });
              }
            }
          }
        })
      }
    });
  }
  selectRecordById(config, cb) {
    if (!config) {
      throw new Error(`
        'selectRecordById':
        'config' is required`);
      return;
    }
    if (!config.text) {
      throw new Error(`
        'selectRecordById':
        'config.text' is required`);
      return;
    }
    if (!typeof config.text === 'string') {
      throw new Error(`
        'selectRecordById':
        incorrect 'config.text':
        ${config.text}`);
      return;
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb({
          status: 500,
          data: null
        });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            console.error(err);
            return cb({
              status: 500,
              data: null
            });
          } else {
            release();
            if (result.rowCount === 1) {
              return cb({
                status: 200,
                data: result.rows[0]
              });
            } else if (result.rowCount === 0) {
              return cb({
                status: 204,
                data: null
              });
            } else {
              console.error(result);
              return cb({
                status: 500,
                data: null
              });
            }
          }
        });
      }
    });
  }
  insertRecord(config, cb) {
    if (!config) {
      throw new Error(`
        'insertRecord':
        'config' is required`);
      return;
    }
    if (!config.text) {
      throw new Error(`
        'insertRecord':
        'config.text' is required`);
      return;
    }
    if (!typeof config.text === 'string') {
      throw new Error(`
        'insertRecord':
        incorrect 'config.text':
        ${config.text}`);
      return;
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(`
          'insertRecord':
          ${err}`);
        return cb({
          status: 500,
          data: null
        });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            if (err.code === '23505') {
              return cb({
                status: 400,
                data: err.detail
              });
            }
            console.error(`
              'insertRecord':
              ${err}`);
            return cb({
              status: 500,
              data: null
            });
          } else {
            release();
            if (result.rowCount === 1) {
              return cb({
                status: 201,
                data: result.rows[0]
              });
            } else {
              console.error(result);
              return cb({
                status: 500,
                data: null
              });
            }
          }
        })
      }
    });
  }
  updateRecord(config, cb) {
    if (!config) {
      throw new Error(`
        'updateRecord':
        'config' is required`);
      return;
    }
    if (!config.text) {
      throw new Error(`
        'updateRecord':
        'config.text' is required`);
      return;
    }
    if (!typeof config.text === 'string') {
      throw new Error(`
        'updateRecord':
        incorrect 'config.text':
        ${config.text}`);
      return;
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(err);
        return cb({
          status: 500,
          data: null
        });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            if (err.code === '23505') {
              return cb({
                status: 400,
                data: err.detail
              });
            }
            console.error(err);
            return cb({
              status: 500,
              data: err.detail
            });
          } else {
            release();
            if (result.rowCount === 1) {
              return cb({
                status: 200,
                data: result.rows[0]
              });
            } else {
              console.error(result);
              return cb({
                status: 500,
                data: null
              });
            }
          }
        });
      }
    });
  }
}
