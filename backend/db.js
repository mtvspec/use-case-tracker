'use strict';

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

module.exports = class Database {
    constructor() {

  }
  static selectAllRecords(config, cb) {
    if (!config) {
      console.error(`
        'selectAllRecords':
        'config' is required`, {
          err: err,
          stack: err.stack
        }
      );
    }
    if (!config.text) {
      console.error(`
        'selectAllRecords':
        'config.text' is required
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    if (!typeof config.text === 'string') {
      console.error(`
        'selectAllRecords':
        incorrect 'config.text':
        ${config.text}
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(`
          'selectAllRecords':
          'connect':
          ${config.text}
          'error':\n`, {
            err: err,
            stack: err.stack
          }
        );
        return cb({
          status: 500,
          data: null
        });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            console.error(`
              'selectAllRecord':
              'query':
              ${config.text}
              'error':\n`, {
                err: err,
                stack: err.stack
              }
            );
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
                console.error(`
                  'selectAllRecord:'
                  'query':
                  ${config.text}
                  'error:'\n`, {
                    err: err,
                    stack: err.stack
                  },
                  `'result:'\n`,
                  result
                );
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
  static selectRecordById(config, cb) {
    if (!config) {
      console.error(`
        'selectRecordById':
        'config' is required
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    if (!config.text) {
      console.error(`
        'selectRecordById':
        'config.text' is required
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    if (!typeof config.text === 'string') {
      console.error(`
        'selectRecordById':
        incorrect 'config.text':
        ${config.text}
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(`
          'selectRecordById':
          'connect':
          ${config.text}
          'error':\n`, {
            err: err,
            stack: err.stack
          }
        );
        return cb({
          status: 500,
          data: null
        });
      } else {
        client.query(config.text, function (err, result) {
          if (err) {
            release();
            console.error(`
              'selectRecordById':
              'query':
              ${config.text}
              'error':\n`, {
                err: err,
                stack: err.stack
              }
            );
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
              console.error(`
                'selectRecordById':
                'query':
                ${config.text}
                'error'\n`, {
                  err: err,
                  stack: err.stack
                },
                `'result':\n`,
                result
              );
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
  static insertRecord(config, cb) {
    if (!config) {
      console.error(`
        'insertRecord':
        'config' is required`
      );
    }
    if (!config.text) {
      console.error(`
        'insertRecord':
        'config.text' is required`
      );
    }
    if (!typeof config.text === 'string') {
      console.error(`
        'insertRecord':
        incorrect 'config.text':
        ${config.text}`
      );
    }
    pool.connect(function (err, client, release) {
      if (err) {
        release();
        console.error(`
          'insertRecord': ${config.text}
          'connect':\n`, {
            err: err,
            stack: err.stack
          }
        );
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
              'query':
              ${config.text}
              'error':\n`, {
                err: err,
                stack: err.stack
              }
            );
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
              console.error(`
                'insertRecord':
                'query':
                ${config.text}
                'error':\n`, {
                  err: err,
                  stack: err.stack
                },
                `'result':\n`,
                result
              );
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
  static updateRecord(config, cb) {
    if (!config) {
      console.error(`
        'updateRecord':
        'config' is required
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    if (!config.text) {
      console.error(`
        'updateRecord':
        'config.text' is required
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    if (!typeof config.text === 'string') {
      console.error(`
        'updateRecord':
        incorrect 'config.text':
        ${config.text}
        'error':\n`, {
          err: err,
          stack: err.stack
        }
      );
    }
    pool.connect(function (err, client, release) {
      if (err) {
        console.error(`
          'updateRecord':
          'connect':
          ${config.text}
          'error':\n`, {
            err: err,
            stack: err.stack
          }
        );
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
              'updateRecord':
              'query':
              ${config.text}
              'error':\n`, {
                err: err,
                stack: err.stack
              }
            );
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
              console.error(`
                'updateRecord':
                'query':
                ${config.text}`,
                `'error':\n`, {
                  err: err,
                  stack: err.stack
                },
                `'result':\n`,
                result
              );
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
