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
import { NodeQueryConfig, NodesQueryConfig } from './interfaces';

export interface ServiceConfig {
  table: string
  tableFields: string[]
}

export class DatabaseService {
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
  public static getNodes (config: NodesQueryConfig) {
    return nodes.getNodes.bind(this)(config)
  }
  public static async getNode (config: NodeQueryConfig) {
    return nodes.getNode.bind(this)(config)
  }
  public static async getNodesCount (config: NodesCountQueryConfig) {
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    let args = [], filter = [], except = [], search = []
    if (config.args && Object.keys(config.args).length > 0) {
      args = this.filterFieldsAndReturnValues(
        config.tableFields,
        Object.keys(config.args),
        config.args
      )
      if (!args) args = []
    }
    if (config.filter && Object.keys(config.filter).length > 0) {
      filter = this.filterFieldsAndReturnValues(
        config.tableFields,
        Object.keys(config.filter),
        config.filter
      )
      if (!filter) filter = []
    }
    if (config.search && config.search.length > 0) {
      if (!config.fields) throw Error('search fields required')
      search.push(`lower(concat(${config.fields})) ~ lower('\\m${config.search}')`)
    }
    if (config.except && Object.keys(config.except).length > 0) {
      except = this.filterFieldsAndReturnValues(
        config.tableFields,
        Object.keys(config.except),
        config.except
      )
      if (!except) except = []
    }
    const response = await db(config.table)
      .where(args)
      .andWhere(filter)
      .whereNot(except)
      .whereRaw(search)
      .count(totalCount).first()
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.queries.getNodes.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Nodes Count`)
      console.log(screenLines.endLine)
    }
    if (debug.queries.getNodesCount.arguments) console.log(arguments)
    if (debug.queries.getNodesCount.response) {
      console.log(screenLines.dashedLine)
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Nodes Count Response`)
      console.log(screenLines.endLine)
      console.log('Filtered args:')
      console.log(args)
      console.log('Filtered filter:')
      console.log(filter)
      console.log('Filtered except:')
      console.log(except)
      console.log('Filtered search:')
      console.log(search)
      console.log('response:')
      console.log(response)
    }
    if (response === undefined) return { totalCount: 0 }
    else return response
  }
  public static async createNode (config: NodeMutationConfig) {
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    const fields: string[] = Object.keys(config.data.input)
    const filteredUserInput = this.filterFieldsAndReturnValues(
      config.tableFields,
      fields,
      config.data.input
    )
    const USER = {
      createdBy: config.user,
      modifiedBy: config.user
    }
    const DATA = Object.assign({}, filteredUserInput, USER)
    const response = await db(config.table)
      .insert(DATA)
      .where({ id: DATA.id })
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.createNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Create Node`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.createNode.arguments) console.log(arguments)
    if (debug.mutations.createNode.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService :Create Node Response`)
      console.log(screenLines.endLine)
      console.log('Filtered data fields:')
      console.log(filteredUserInput)
      console.log('response:')
      console.log(response)
    }
    if (response && response.id > 0) return response[0]
    else if (response === undefined) return null
    return response[0]
  }
  public static async updateNode (config: NodeMutationConfig) {
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    const fields: string[] = Object.keys(config.data.input)
    const user = {
      updatedBy: config.user,
      updatedAt: 'now()',
      modifiedBy: config.user
    }
    const filteredFieldsWithValues = this.filterFieldsAndReturnValues(
      config.tableFields,
      fields,
      config.data.input
    )
    let data = Object.assign({}, filteredFieldsWithValues, user)
    const response = await db(config.table)
      .where({ id: data.id })
      .update(data)
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.updateNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Update Node`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.updateNode.arguments) console.log(arguments)
    if (debug.mutations.updateNode.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Update Node Response`)
      console.log(screenLines.endLine)
      console.log('Filtered data fields:')
      console.log(filteredFieldsWithValues)
      console.log('response:')
      console.log(response)
    }
    if (response && response.id > 0) return response[0]
    else if (response === undefined) return null
    return response[0]
  }
  public static async deleteNode (config: NodeConfig) {
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    if (!config.id) throw Error('id required')
    const user = {
      deletedBy: config.user,
      deletedAt: 'now()',
      modifiedBy: config.user
    }
    const data = Object.assign({}, { isDeleted: true }, user)
    const response = await db(config.table)
      .where({ id: config.id })
      .update(data)
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.deleteNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Delete Node`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.deleteNode.arguments) console.log(arguments)
    if (debug.mutations.deleteNode.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Delete Node Response`)
      console.log(screenLines.endLine)
      console.log('response:')
      console.log(response)
    }
    if (response && response.id > 0) return response[0]
    else if (response === undefined) return null
    return response[0]
  }
  public static async restoreNode (config: NodeConfig) {
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    if (!config.id) throw Error('id required')
    const user = {
      restoredBy: config.user,
      restoredAt: 'now()',
      modifiedBy: config.user
    }
    const data = Object.assign({}, { isDeleted: false }, user)
    const response = await db(config.table)
      .where({ id: config.id })
      .update(data)
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.restoreNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Restore Node`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.restoreNode.arguments) console.log(arguments)
    if (debug.mutations.restoreNode.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Restore Node Response`)
      console.log(screenLines.endLine)
      console.log('response:')
      console.log(response)
    }
    if (response && response.id > 0) return response
    else if (response === undefined) return null
    return response[0]
  }
  public static async getEdge (config: EdgeQueryConfig) {
    // source
    // args?
    // filter?
    // except?
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    let args = []
    if (config.args && Object.keys(config.args).length > 0) {
      args = this.filterFieldsAndReturnValues(
        config.tableFields,
        Object.keys(config.args),
        config.args
      )
      if (!args) args = []
    }
    const requestedFields: string[] = this.filterFields(config.tableFields, config.unfilteredFields)
    const filteredSource = this.filterFieldsAndReturnValues(config.tableFields, Object.keys(config.source), config.source)
    const response = await db(config.table)
      .select(requestedFields)
      .where(filteredSource)
      .andWhere(args).first()
      .catch(err => {
        console.error(err)
        return err
      })
    if (debug.queries.getEdge.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Edge`)
      console.log(screenLines.endLine)
    }
    if (debug.queries.getEdge.arguments) console.log(arguments)
    if (debug.queries.getEdge.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Edge Response`)
      console.log(screenLines.endLine)
      console.log('Filtered requested fields:')
      console.log(requestedFields)
      console.log(screenLines.endLine)
      console.log('response:')
      console.log(screenLines.endLine)
      console.log(response)
      console.log(screenLines.endLine)
    }
    if (response && response.id > 0) return response
    else if (response === undefined) return null
    return response
  }
  public static async getEdges (config: EdgesQueryConfig) {
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    const requestedFields = this.filterFields(config.tableFields, config.unfilteredFields)
    const response = await db(config.table)
      .select(requestedFields)
      .where(config.source)
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.queries.getEdges.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Edges`)
      console.log(screenLines.endLine)
    }
    if (debug.queries.getEdges.arguments) console.log(arguments)
    if (debug.queries.getEdges.response) {
      console.log(`DatabaseService : Get Edges Response`)
      console.log('Filtered requested fields:')
      console.log(requestedFields)
      console.log('response:')
      console.log(response)
    }
    if (response && response.id > 0) return response
    else if (response === undefined) return []
    return response
  }
  public static async getEdgesCount (config: EdgesCountQueryConfig) {
    console.log(config)
    if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
    const filteredSource = this.filterFieldsAndReturnValues(config.tableFields, Object.keys(config.source), config.source)
    const response = await db(config.table)
      .where(filteredSource)
      .count(totalCount).first()
      .catch(err => {
        console.error(err)
        return err
      })
    console.log(response)
    if (debug.queries.getEdgesCount.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Edges Count`)
      console.log(screenLines.endLine)
    }
    if (debug.queries.getEdgesCount.arguments) console.log(arguments)
    if (debug.queries.getEdgesCount.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Get Edges Count Response`)
      console.log(screenLines.endLine)
      console.log('response:')
      console.log(response)
    }
    return response
  }
  public static async createEdge (
    table: string,
    tableFields: string[],
    data: any,
    user: number
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    const fields: string[] = Object.keys(data)
    const _user = {
      createdBy: user,
      createdAt: 'now()',
      modifiedBy: user
    }
    const filteredFieldsWithValues = this.filterFieldsAndReturnValues(
      tableFields,
      fields,
      data
    )
    const _data = Object.assign({}, filteredFieldsWithValues, _user)
    const response = await db(table)
      .where({ id: _data.id })
      .insert(_data)
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.createEdge.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Create Edge : ID - ${arguments[3]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.createEdge.arguments) console.log(arguments)
    if (debug.mutations.createEdge.response) {
      console.log(`DatabaseService : Create Edge Response : ID - ${arguments[3]}`)
      console.log('Filtered fields with values:')
      console.log(filteredFieldsWithValues)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async updateEdge (
    table: string,
    tableFields: string[],
    data: any,
    user: number
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    const fields: string[] = Object.keys(data.input)
    const _user = {
      updatedBy: user,
      updatedAt: 'now()',
      modifiedBy: user
    }
    const filteredFieldsWithValues = this.filterFieldsAndReturnValues(
      tableFields,
      fields,
      data.input
    )
    let _data = Object.assign({}, filteredFieldsWithValues, _user)
    const response = await db(table)
      .where({ id: _data.id })
      .update(_data)
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.updateEdge.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Update Edge : ID - ${arguments[3]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.updateEdge.arguments) console.log(arguments)
    if (debug.mutations.updateEdge.response) {
      console.log(`DatabaseService : Update Edge Response : ID - ${arguments[3]}`)
      console.log('Filtered fields with values:')
      console.log(filteredFieldsWithValues)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async deleteEdge (table: string, id: any, user: number) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
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
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.deleteEdge.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Delete Node : ID - ${arguments[1]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.deleteEdge.arguments) console.log(arguments)
    if (debug.mutations.deleteEdge.response) {
      console.log(`DatabaseService : Delete Edge Response : ID - ${arguments[1]}`)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async restoreEdge (
    table: string,
    id: number,
    user: number
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
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
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.restoreEdge.name) console.log(`DatabaseService : Restore Edge : ID - ${arguments[1]}`)
    if (debug.mutations.restoreEdge.arguments) console.log(arguments)
    if (debug.mutations.restoreEdge.name) {
      console.log(`DatabaseService : Restore Edge Response : ID - ${arguments[1]}`)
      console.log('response:')
      console.log(response)
    }
    return response[0]
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