import { DatabaseResponse } from './database-response';

const { Pool } = require('pg')

const config = {
  user: process.env.PGUSER, //env var: PGUSER
  database: process.env.PGDATABASE, //env var: PGDATABASE
  password: process.env.PGPASSWORD, //env var: PGPASSWORD
  host: process.env.PGHOST, // Server hosting the postgres database
  port: process.env.PGPORT, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = new Pool(config);

import { QueryConfig } from './query.config';

pool.on('error', function (err) {
  console.error(err);
  throw new Error('Database not responding');
})

export class DatabaseService {
  rs: DatabaseResponse;
  public selectAllRecords (config: QueryConfig): Promise<DatabaseResponse> {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err);
          console.error(`connect error: `, err);
          return reject(new DatabaseResponse(500, null));
        } else {
          client.query(config.text, (err, result) => {
            if (err) {
              done(err);
              console.error(`client error: `, err);
              return reject(new DatabaseResponse(500, null));
            } else {
              done();
              const rowCount = result.rowCount, rows = result.rows;
              if (rowCount > 0) return resolve(new DatabaseResponse(200, rows));
              else if (rowCount === 0) return resolve(new DatabaseResponse(204, []));
              else return reject(new DatabaseResponse(500, null));
            }
          });
        }
      });
    });
  }
  public selectRecord (config: QueryConfig): Promise<DatabaseResponse> {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err);
          console.error(`connect error: `, err);
          return reject(new DatabaseResponse(500, null));
        } else {
          client.query(config.text, (err, result) => {
            if (err) {
              done(err);
              console.error(`client error: `, err);
              return reject(new DatabaseResponse(500, null));
            } else {
              done();
              const rowCount = result.rowCount, rows = result.rows;
              if (rowCount === 1) return resolve(new DatabaseResponse(200, rows[0]));
              else if (rowCount === 0) return resolve(new DatabaseResponse(204, []));
              else return reject(new DatabaseResponse(500, null));
            }
          });
        }
      });
    });
  }
  public insertRecord (config: QueryConfig): Promise<DatabaseResponse> {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err);
          Logger.log(err);
          return reject(new DatabaseResponse(500, null));
        } else {
          client.query(config.text, (err, result) => {
            if (err) {
              done(err);
              console.error(`client error: `, err);
              return reject(new DatabaseResponse(500, null));
            } else {
              done();
              const rowCount = result.rowCount, rows = result.rows;
              if (rowCount === 1) return resolve(new DatabaseResponse(201, rows[0]));
              else return reject(new DatabaseResponse(500, null));
            }
          });
        }
      });
    });
  }
  public updateRecord (config: QueryConfig): Promise<DatabaseResponse> {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err);
          console.error(`connect error: `, err);
          return reject(new DatabaseResponse(500, null));
        } else {
          client.query(config.text, (err, result) => {
            if (err) {
              done(err);
              console.error(`client error: `, err);
              return reject(new DatabaseResponse(500, null));
            } else {
              done();
              const rowCount = result.rowCount, rows = result.rows;
              if (rowCount === 1) return resolve(new DatabaseResponse(200, rows[0]));
              else if (rowCount === 0)  return resolve(new DatabaseResponse(204, []));
              else return reject(new DatabaseResponse(500, null));
            }
          });
        }
      });
    });
  }
}

interface Logger {
  log (data: any): void 
}

class Logger implements Logger {
  public errorTimestamp?: Date = new Date();
  static log (data: any, values?: any): void {
    console.error(new Date(), data);
  }
}

class ConsoleErrorLogger implements Logger {
  log (err: any): void {
    console.error(err);
  }
}

class DatabaseErrorLogger implements Logger {
  log (err: any): void {
    // store err into database
  }
}
