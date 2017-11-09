const { Pool } = require('pg')
import { convertData } from './../../utils'
const config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //process.env.PGDATABASE, //env var: PGDATABASE
  // password: process.env.PGPASSWORD, //env var: PGPASSWORD
  host: '192.168.1.16', // Server hosting the postgres database
  port: process.env.PGPORT, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const successDatabaseResponse: string = '----------------------------------------------------- Database Success Response -----------------------------------------------------'
const failureDatabaseResponse: string = '------------------------------------------------------- Database Failure Response ---------------------------------------------------'
const dataBaseQueryConfig: string = '------------------------------------------------------- Database Query Config -------------------------------------------------------'
const responseSend: string = '--========================================================= Response Send =========================================================--'
const dataLine: string = '---------------------------------------------------------------- Data ---------------------------------------------------------------'
const errorLine: string = '---------------------------------------------------------------- Error --------------------------------------------------------------'
const endLine: string = '-------------------------------------------------------------------------------------------------------------------------------------'

const screenLines = {
  successDatabaseResponse,
  failureDatabaseResponse,
  dataBaseQueryConfig,
  dataLine,
  errorLine,
  responseSend,
  endLine
}

const ErrorMessages = {
  db: 'Database not responding',
  queryConfig: 'Query config required',
  qty: 'Rows count required'
}

const pool = new Pool(config)

pool.on('error', function (err) {
  console.trace(err);
  throw new Error(ErrorMessages.db);
})

export class DatabaseService {
  public static convertData
  public static async query (queryConfig: QueryConfig) {
    if (!(queryConfig instanceof QueryConfig)) {
      console.trace(queryConfig)
      throw new Error(ErrorMessages.queryConfig)
    }
    if (!(queryConfig.qty === 1 || queryConfig.qty === '*')) {
      console.trace(queryConfig)
      throw new Error(ErrorMessages.qty)
    }
    return new Promise((resolve, reject) => {
      pool.connect(async (err, client, done) => {
        if (err) {
          done(err)
          this.errorHadler(queryConfig, err)
          return await reject(this.createResponse(500, null))
        } else {
          await client.query(queryConfig.text, async (err, result) => {
            if (err) {
              done(err)
              this.errorHadler(queryConfig, err)
              return await reject(new Error(err.detail))
            } else {
              done()
              await result
              const rowCount: number = Number(result.rowCount), rows: any = result.rows
              this.dataLogger(queryConfig, rows)
              console.log(`rowCount: ${result.rowCount}`)
              if (rowCount === 0) return await resolve([])
              else if (queryConfig.qty === 1 && rowCount === 1) return await resolve(rows[0])
              else if (rowCount > 0) return await resolve(rows)
              else return await resolve(this.createResponse(500, []))
            }
          })
        }
      })
    })
  }
  public static async fields (table) {
    if (!(typeof table === 'string')) {
      console.trace(table)
      throw new Error(ErrorMessages.queryConfig)
    }
    return new Promise((resolve, reject) => {
      pool.connect(async (err, client, done) => {
        if (err) {
          done(err)
          console.trace(err)
          return await reject(this.createResponse(500, null))
        } else {
          await client.query(`SELECT * FROM ${table} LIMIT 1;`, async (err, result) => {
            if (err) {
              done(err)
              console.trace(err)
              return await reject(new Error(err.detail))
            } else {
              done()
              await result
              const fields: any = result.fields
              return await resolve(fields)
            }
          })
        }
      })
    })
  }
  public static selectAllRecords (queryConfig: QueryConfig):
    Promise<SuccessDatabaseResponse | ErrorDatabaseResponse> {
    if (!(queryConfig instanceof QueryConfig)) {
      console.trace(queryConfig)
      throw new Error('Query config required')
    };
    this.queryConfigLogger(queryConfig)
    return new Promise((resolve, reject) => {
      pool.connect(async (err, client, done) => {
        if (err) {
          done(err)
          console.trace(err)
          this.errorHadler(queryConfig, err)
          return await reject(this.createResponse(500, null))
        } else {
          await client.query(queryConfig.text, async (err, result) => {
            if (err) {
              done(err)
              this.errorHadler(queryConfig, err)
              return await reject(this.createResponse(500, null))
            } else {
              done()
              await result
              const rowCount: number = result.rowCount, rows: any = result.rows
              this.dataLogger(queryConfig, rows)
              if (rowCount > 0) return await resolve(this.createResponse(200, rows));
              else if (rowCount === 0) return await resolve(this.createResponse(204, []));
              else return await reject(this.createResponse(500, null));
            }
          });
        }
      });
    });
  }
  public static selectRecord (queryConfig: QueryConfig):
    Promise<DatabaseResponse> {
    this.queryConfigLogger(queryConfig);
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err);
          console.trace(err);
          this.errorHadler(queryConfig, err);
          return reject(this.createResponse(500, null));
        } else {
          client.query(queryConfig.text, (err, result) => {
            if (err) {
              done(err);
              console.trace(err);
              this.errorHadler(queryConfig, err);
              return reject(this.createResponse(500, null));
            } else {
              done();
              const rowCount: number = result.rowCount, rows: any = result.rows;
              this.dataLogger(queryConfig, rows)
              if (rowCount === 1) return resolve(this.createResponse(200, rows[0]));
              else if (rowCount === 0) return resolve(this.createResponse(204, []));
              else return reject(this.createResponse(500, null));
            }
          });
        }
      });
    });
  }
  public static insertRecord (queryConfig: QueryConfig): Promise<SuccessDatabaseResponse | ErrorDatabaseResponse> {
    this.queryConfigLogger(queryConfig)
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err)
          console.trace(err)
          this.errorHadler(queryConfig, err)
          return reject(this.createResponse(500, null))
        } else {
          client.query(queryConfig.text, (err, result) => {
            if (err) {
              done(err)
              console.trace(err)
              this.errorHadler(queryConfig, err)
              return reject(this.createResponse(500, null))
            } else {
              done()
              const rowCount: number = result.rowCount, rows: any = result.rows
              this.dataLogger(queryConfig, rows)
              if (rowCount === 1) return resolve(this.createResponse(201, rows[0]))
              else return reject(this.createResponse(500, null))
            }
          })
        }
      })
    })
  }
  public static updateRecord (queryConfig: QueryConfig): Promise<SuccessDatabaseResponse | ErrorDatabaseResponse> {
    this.queryConfigLogger(queryConfig);
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          done(err);
          console.trace(err);
          this.errorHadler(queryConfig, err);
          return reject(this.createResponse(500, null));
        } else {
          client.query(queryConfig.text, (err, result) => {
            if (err) {
              done(err);
              console.trace(err);
              this.errorHadler(queryConfig, err);
              return reject(this.createResponse(500, null));
            } else {
              done();
              const rowCount: number = result.rowCount, rows: any = result.rows;
              this.dataLogger(queryConfig, rows);
              if (rowCount === 1) return resolve(this.createResponse(200, rows[0]));
              else if (rowCount === 0) return resolve(this.createResponse(204, []));
              else return reject(this.createResponse(500, null));
            }
          });
        }
      });
    });
  }
  public static createResponse (status: number, data: any):
    SuccessDatabaseResponse | ErrorDatabaseResponse {
    if (status && typeof status === 'number' && (status === 200 || status === 201 || status === 204) && data && typeof data === 'object') {
      return new SuccessDatabaseResponse(<number>status, <any>data);
    } else {
      console.trace(status, data);
      return new ErrorDatabaseResponse(500, data);
    }
  }
  private static dataLogger (queryConfig: QueryConfig, data: any) {
    console.log(screenLines.successDatabaseResponse)
    this.queryConfigLogger(queryConfig)
    console.log(screenLines.dataLine)
    console.log(data)
    console.log(screenLines.endLine)
    console.log('response at ', Date())
    console.log(responseSend)
  }

  private static queryConfigLogger (queryConfig: QueryConfig) {
    console.log(screenLines.dataBaseQueryConfig);
    console.log(queryConfig.text);
    console.log('');
    console.log(screenLines.endLine);
  }
  private static errorHadler (queryConfig: QueryConfig, err: Error) {
    console.log(screenLines.failureDatabaseResponse);
    console.log(screenLines.dataBaseQueryConfig);
    if (queryConfig.operationName) console.log(`operationName ${queryConfig.operationName}`)
    console.log(queryConfig.text);
    console.log(screenLines.endLine);
    console.log(screenLines.errorLine);
    console.log(err.message || err);
    console.log(screenLines.endLine);
    console.log('error at ', Date());
    console.log(screenLines.responseSend);
  }
}

export class QueryConfig {
  operationName: string
  qty: string | number
  text: string
  constructor(config: { name?: string, qty: string | number, text: string }) {
    this.qty = config.qty;
    this.text = config.text;
  }
}

export abstract class DatabaseResponse {
  status: number;
  data: any;
  constructor(status: number, data: string) {
    return {
      status: status,
      data: data
    }
  }
}

export class SuccessDatabaseResponse extends DatabaseResponse {
  constructor(status: number, data: any) {
    super(status, data)
  }
}

export class ErrorDatabaseResponse extends DatabaseResponse {
  constructor(status: number, data: any) {
    super(status, data)
  }
}