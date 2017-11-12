const totalCount: string = 'id as totalCount'
const { Pool } = require('pg')
import { convertData, field } from './../../utils'
const config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //process.env.PGDATABASE, //env var: PGDATABASE
  // password: process.env.PGPASSWORD, //env var: PGPASSWORD
  host: '192.168.1.16', // Server hosting the postgres database
  port: process.env.PGPORT, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

interface Service {
  table: string
}

import db from './../../knex'

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

pool.on('error', function (err: Error) {
  console.trace(err);
  throw new Error(ErrorMessages.db);
})

export class DatabaseService {
  public static convertData: any
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
      pool.connect(async (err: Error, client: any, done: any) => {
        if (err) {
          done(err)
          this.errorHadler(queryConfig, err)
          return await reject(this.createResponse(500, null))
        } else {
          await client.query(queryConfig.text, async (err: any, result: any) => {
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
  public static filterFields (tableFields: field[], unfilteredFiels: field[]) {
    return unfilteredFiels.filter((field: field) => { return (tableFields.indexOf(field) > -1) })
  }
  public static filterFieldsAndReturnValues (tableFields: field[], unfilteredFiels: field[], args: any) {
    let obj: any = {}
    return unfilteredFiels.filter((field: field) => {
      return (tableFields.indexOf(field) > -1)
    }).map((field: any) => {
      obj[field] = args[field]
      return obj
    })[0]
  }
  public static async getNodes (table: string, tableFields: field[], unfilteredFiels: field[], id?: number | string, orderBy: any[] = ['id']) {
    if (id)
      return await db(table)
        .select(this.filterFields(tableFields, unfilteredFiels))
        .where(id)
        .orderBy(this.filterFields(tableFields, orderBy))
    else
      return await db(table)
        .select(this.filterFields(tableFields, unfilteredFiels))
        .orderBy(this.filterFields(tableFields, orderBy))
  }
  public static async getNode (table: string, tableFields: field[], unfilteredFiels: field[], id: number, args?: any) {
    return await db(table)
      .select(this.filterFields(tableFields, unfilteredFiels))
      .andWhere({ id }).first()
  }
  public static async getNodesCount (table: string, source?: number, args?: any) {
    if (source)
      return await db(table)
        .count(totalCount).first()
        .where({ source })
    else if (args)
      return await db(table)
        .where(args)
        .count(totalCount).first()
    else
      return await db(table)
        .count(totalCount).first()
  }
  public static async filterNodes (table: string, tableFields: field[], unfilteredFiels: field[], args: any, orderBy: any[] = ['id']) {
    const _args: any[] = Object.keys(args)
    return await db(table)
      .select(this.filterFields(tableFields, unfilteredFiels))
      .where(this.filterFieldsAndReturnValues(tableFields, _args, args))
      .orderBy(this.filterFields(tableFields, orderBy))
  }
  public static async searchNode (table: string, tableFields: field[], unfilteredFiels: field[], search: string, fields: any, orderBy: any = ['id']) {
    return await db(table)
      .select(this.filterFields(tableFields, unfilteredFiels))
      .whereRaw(`lower(concat(${fields})) ~ lower('\\m${search}')`)
      .orderBy(orderBy)
  }
  public static async createNode (table: string, data: any, user: number) {
    const fields: any[] = Object.keys(data.input)
    const _user = {
      createdBy: user,
      createdAt: 'now()',
      modifiedBy: user
    }
    let _data = Object.assign({}, data.input, _user)
    const response = await db(table)
      .where({ id: _data.id })
      .insert(_data)
      .returning('*')
    return response[0]
  }
  public static async updateNode (table: string, data: any, user: number) {
    const fields: any[] = Object.keys(data.input)
    const _user = {
      updatedBy: user,
      updatedAt: 'now()',
      modifiedBy: user
    }
    let _data = Object.assign({}, data.input, _user)
    const response = await db(table)
      .where({ id: _data.id })
      .update(_data)
      .returning('*')
    return response[0]
  }
  public static async deleteNode (table: string, id: any, user: number) {
    const _user = {
      deletedBy: user,
      deletedAt: 'now()',
      modifiedBy: user
    }
    let _data = Object.assign({}, { isDeleted: true }, _user)
    const response = await db(table)
      .where({ id })
      .update(_data)
      .returning('*')
    return response[0]
  }
  public static async restoreDeletedNode (table: string, id: number, user: number) {
    const _user = {
      restoredBy: user,
      restoredAt: 'now()',
      modifiedBy: user
    }
    let _data = Object.assign({}, { isDeleted: false }, _user)
    const response = await db(table)
      .where({ id })
      .update(_data)
      .returning('*')
    return response[0]
  }
  public static async getEdge (table: string, tableFields: any, unfilteredFiels: field[], source: number, args: any) {
    const field = Object.keys(args)
    const fields = this.filterFields(tableFields, unfilteredFiels)
    if (args.length > 0) {
      const range = args.createdAt || args.updatedAt || args.deletedAt || args.modifiedAt
      const queries: any = {
        'createdAt': async () => {
          return await db(table)
            .select(fields)
            .whereBetween(`${field}`, [range.start, range.end])
            .andWhere({ source })
        },
        'updatedAt': async () => {
          console.log(range)
          return await db(table)
            .select(fields)
            .whereBetween(`${field}`, [range.start, range.end])
            .andWhere({ source })
        },
        'deletedAt': async () => {
          return await db(table)
            .select(fields)
            .whereBetween(`${field}`, [range.start, range.end])
            .andWhere({ source })
        },
        'modifiedAt': async () => {
          return await db(table)
            .select(fields)
            .whereBetween(`${field}`, [range.start, range.end])
            .andWhere({ source })
        }
      }
      return queries[field[0]]()
    } else return await db(table)
      .select(fields)
      .where({ source })
  }
  public static async fields (table: string) {
    console.log(table)
    if (!(typeof table === 'string')) {
      console.trace(table)
      throw new Error(ErrorMessages.queryConfig)
    }
    return new Promise((resolve, reject) => {
      pool.connect(async (err: any, client: any, done: any) => {
        if (err) {
          done(err)
          console.trace(err)
          return await reject(this.createResponse(500, null))
        } else {
          await client.query(`SELECT * FROM ${table} LIMIT 1;`, async (err: any, result: any) => {
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
      pool.connect(async (err: any, client: any, done: any) => {
        if (err) {
          done(err)
          console.trace(err)
          this.errorHadler(queryConfig, err)
          return await reject(this.createResponse(500, null))
        } else {
          await client.query(queryConfig.text, async (err: any, result: any) => {
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
      pool.connect((err: any, client: any, done: any) => {
        if (err) {
          done(err);
          console.trace(err);
          this.errorHadler(queryConfig, err);
          return reject(this.createResponse(500, null));
        } else {
          client.query(queryConfig.text, (err: any, result: any) => {
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
      pool.connect((err: any, client: any, done: any) => {
        if (err) {
          done(err)
          console.trace(err)
          this.errorHadler(queryConfig, err)
          return reject(this.createResponse(500, null))
        } else {
          client.query(queryConfig.text, (err: any, result: any) => {
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
      pool.connect((err: any, client: any, done: any) => {
        if (err) {
          done(err);
          console.trace(err);
          this.errorHadler(queryConfig, err);
          return reject(this.createResponse(500, null));
        } else {
          client.query(queryConfig.text, (err: any, result: any) => {
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