import {
  NodeQueryConfig,
  NodesQueryConfig,
  NodesCountQueryConfig,
  NodeMutationConfig,
  NodeConfig,
  EdgeQueryConfig,
  EdgesQueryConfig,
  EdgesCountQueryConfig
} from './interfaces';
import { debug } from './debug.config'
const totalCount: string = 'id as totalCount'
const { Pool } = require('pg')
import { config } from './connector.config'
import db from './../../knex'
import { ErrorMessages } from './messages'
import { screenLines } from './messages'
const pool = new Pool(config)
pool.on('error', function (err: Error) {
  console.trace(err);
  throw new Error(ErrorMessages.db);
})
import { nodes } from './methods/nodes'
import { edges } from './methods/edges/index';

export interface ServiceConfig {
  table: string
  tableFields: string[]
}

export class DatabaseService {
  public static getNodes (config: NodesQueryConfig) {
    return nodes.getNodes(config)
  }
  public static getNodesCount (config: NodesCountQueryConfig) {
    return nodes.getNodesCount(config)
  }
  public static getNode (config: NodeQueryConfig) {
    return nodes.getNode(config)
  }
  public static createNode (config: NodeMutationConfig) {
    return nodes.createNode(config)
  }
  public static updateNode (config: NodeMutationConfig) {
    return nodes.updateNode(config)
  }
  public static deleteNode (config: NodeConfig) {
    return nodes.deleteNode(config)
  }
  public static restoreNode (config: NodeConfig) {
    return nodes.restoreNode(config)
  }
  public static getEdge (config: EdgeQueryConfig) {
    return edges.getEdge.bind(this)(config)
  }
  public static getEdges (config: EdgesQueryConfig) {
    return edges.getEdges.bind(this)(config)
  }
  public static getEdgesCount (config: EdgesCountQueryConfig) {
    return edges.getEdgesCount.bind(this)(config)
  }
  public static createEdge (config) {
    return edges.createEdge.bind(this)(config)
  }
  public static updateEdge (config) {
    return edges.updateEdge.bind(this)(config)
  }
  public static deleteEdge (config) {
    return edges.deleteEdge.bind(this)(config)
  }
  public static restoreEdge (config) {
    return edges.restoreEdge.bind(this)(config)
  }
  public static buildFieldSet = (fields: string[], prefix: string) => {
    if (!fields) throw Error('Table fields is required')
    if (!prefix) throw Error('Column prefix is required')
    let _fields: any[] = []
    fields.forEach(field => {
      _fields.push(`"${prefix}"."${field}"`)
    })
    return `${_fields}`
  }
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
              // if (debug.queries.query) console.log(arguments[0].text)
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
  public static filterFields (
    tableFields: string[],
    unfilteredFiels: string[]
  ) {
    if (debug.filters.fieldFilter.arguments) console.trace(arguments)
    const result = unfilteredFiels.filter((field: string) => { return (tableFields.indexOf(field) > -1) })
    if (debug.filters.fieldFilter.result) console.log(result)
    return result
  }
  public static filterFieldsAndReturnValues (
    tableFields: string[],
    unfilteredFiels: string[],
    args: { [key: string]: any }
  ) {
    if (debug.filters.fieldFilterWithValues.arguments) console.trace(arguments)
    let obj: any = {}
    return unfilteredFiels.filter((field: string) => {
      return (tableFields.indexOf(field) > -1)
    }).map((field: string) => {
      obj[field] = args[field]
      if (debug.filters.fieldFilterWithValues.result) console.log(obj)
      return obj
    })[0]
  }
  public static validateTable (table: string): boolean {
    if (debug.validateTable.arguments) console.trace(arguments)
    if (debug.argumentsCount) console.log(`received arguments count: ${this.validateTable.length}`)
    if (table && typeof table === 'string') return true
    else return false
  }
  public static async fields (table: string) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
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
              const res: any = result.fields
              let fields: string[] = []
              if (res && res.length > 0) {
                res.forEach((field: { name: string }) => fields.push(field.name))
              }
              if (debug.tables.name) console.log(`Table: ${table}`)
              if (debug.tables.fields) console.log(fields)
              return await resolve(fields)
            }
          })
        }
      })
    })
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
    console.log(screenLines.responseSend)
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
    console.log(err);
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