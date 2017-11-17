import { debug } from './debug.config'
console.log(debug)
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
    if (debug.queries.query) console.log(arguments)
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
  public static filterFields (tableFields: string[], unfilteredFiels: string[]) {
    if (debug.filters.fieldFilter.arguments) console.trace(arguments)
    const result = unfilteredFiels.filter((field: string) => { return (tableFields.indexOf(field) > -1) })
    if (debug.filters.fieldFilter.result) console.log(result)
    return result
  }
  public static filterFieldsAndReturnValues (tableFields: string[], unfilteredFiels: string[], args: any) {
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
  public static async getNodes (
    table: string,
    tableFields: string[],
    unfilteredFiels: string[],
    id?: number | string,
    args?: any,
    except?: any,
    orderBy: any[] = ['id']
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    if (id) {
      const filteredFields = this.filterFields(tableFields, unfilteredFiels)
      const response = await db(table)
        .select(filteredFields)
        .where(id)
        .orderBy(this.filterFields(tableFields, orderBy))
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodes.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNodes.response) {
        console.log(screenLines.successDatabaseResponse)
        console.log(`DatabaseService : Get Nodes Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(filteredFields)
        console.log('response:')
        console.log(response)
        console.log(screenLines.endLine)
      }
      return response
    }
    else if (args) {
      const _args: string[] = Object.keys(args)
      const filteredFields = this.filterFields(tableFields, unfilteredFiels)
      const filteredFieldsWithValues = this.filterFieldsAndReturnValues(tableFields, _args, args)
      const response = await db(table)
        .select(filteredFields)
        .where(filteredFieldsWithValues)
        .orderBy(this.filterFields(tableFields, orderBy))
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodes.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNodes.response) {
        console.log(screenLines.successDatabaseResponse)
        console.log(`DatabaseService : Get Nodes Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(filteredFields)
        console.log('response:')
        console.log(response)
        console.log(screenLines.endLine)
      }
      return response
    }
    else if (except) {
      const filteredFields = this.filterFields(tableFields, unfilteredFiels)
      const response = await db(table)
        .select(filteredFields)
        .whereNot(except)
        .orderBy(this.filterFields(tableFields, orderBy))
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodes.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNodes.response) {
        console.log(screenLines.successDatabaseResponse)
        console.log(`DatabaseService : Get Nodes Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(filteredFields)
        console.log('response:')
        console.log(response)
        console.log(screenLines.endLine)
      }
      return response
    }
    else {
      const filteredFields = this.filterFields(tableFields, unfilteredFiels)
      const response = await db(table)
        .select(filteredFields)
        .orderBy(this.filterFields(tableFields, orderBy))
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNode.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Node : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNodes.response) {
        console.log(screenLines.successDatabaseResponse)
        console.log(`DatabaseService : Get Nodes Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(filteredFields)
        console.log('response:')
        console.log(response)
        console.log(screenLines.endLine)
      }
      return response
    }
  }
  public static async getNode (
    table: string,
    tableFields: string[],
    unfilteredFiels: string[],
    id: number | string,
    args?: any
  ) {
    const filteredFields = DatabaseService.filterFields(tableFields, unfilteredFiels)
    if (!DatabaseService.validateTable(table)) throw Error(`invalid table name: ${table}`)
    let response: any
    if (args) {
      const _args: string[] = Object.keys(args)
      const filteredFieldsWithValues = DatabaseService.filterFieldsAndReturnValues(
        tableFields,
        _args,
        args
      )
      response = await db(table)
        .select(filteredFields)
        .where(filteredFieldsWithValues).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNode.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Node : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNode.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Node Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(filteredFields)
        console.log('Filtered args:')
        console.log(filteredFieldsWithValues)
        console.log('response:')
        console.log(response)
      }
      if (response && response.id > 0) return response
      else if (response === undefined) return null
      else return response
    }
    else {
      response = await db(table)
        .select(filteredFields)
        .where({ id }).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNode.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Node : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNode.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Node Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(filteredFields)
        console.log('response:')
        console.log(response)
      }
      if (response && response.id > 0) return response
      else if (response === undefined) return null
      else return response
    }
  }
  public static async getNodesCount (
    table: string,
    tableFields?: string[],
    source?: number | string,
    args?: any,
    except?: any,
    search?: any,
    fields?: string[]
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    if (source) {
      const response = await db(table)
        .count(totalCount).first()
        .where({ source })
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodesCount.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNode.arguments) arguments[0].text ? console.log(arguments[0].length === 1) :
        console.log(arguments)
      if (debug.queries.getNodesCount.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count Response : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
        console.log('response:')
        console.log(response)
      }
      if (response === undefined) return { totalCount: 0 }
      else return response
    }
    else if (args && search) {
      const _args: string[] = Object.keys(args)
      const filteredFieldsWithValues = this.filterFieldsAndReturnValues(
        tableFields,
        _args,
        args
      )
      const response = await db(table)
        .count(totalCount)
        .whereRaw(`lower(concat(${fields})) ~ lower('\\m${search}')`)
        .andWhere(filteredFieldsWithValues).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodesCount.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNodesCount.arguments) console.log(arguments)
      if (debug.queries.getNodesCount.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count Response : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
        console.log('Filtered args:')
        console.log(filteredFieldsWithValues)
        console.log('response:')
        console.log(response)
      }
      if (response === undefined) return { totalCount: 0 }
      else return response
    }
    else if (args) {
      const _args: string[] = Object.keys(args)
      const filteredFieldsWithValues = this.filterFieldsAndReturnValues(
        tableFields,
        _args,
        args
      )
      const response = await db(table)
        .where(filteredFieldsWithValues)
        .count(totalCount).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodesCount.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNodesCount.arguments) console.log(arguments)
      if (debug.queries.getNodesCount.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count Response : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
        console.log('Filtered args:')
        console.log(filteredFieldsWithValues)
        console.log('response:')
        console.log(response)
      }
      if (response === undefined) return { totalCount: 0 }
      else return response
    }
    else if (except) {
      const response = await db(table)
        .whereNot(except)
        .count(totalCount).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodes.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNodesCount.arguments) console.log(arguments)
      if (debug.queries.getNode.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count Response : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
        console.log('response:')
        console.log(response)
      }
      if (response === undefined) return { totalCount: 0 }
      else return response
    }
    else {
      const response = await db(table)
        .count(totalCount).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getNodes.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getNodesCount.arguments) console.log(arguments)
      if (debug.queries.getNodesCount.response) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Nodes Count Response : ID - ${arguments[2]}`)
        console.log(screenLines.endLine)
        console.log('response:')
        console.log(response)
      }
      if (response === undefined) return { totalCount: 0 }
      else return response
    }
  }
  public static async filterNodes (table: string, tableFields: string[], unfilteredFiels: string[], args: any, orderBy: any[] = ['id']) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    const _args: string[] = Object.keys(args)
    const filteredFields = this.filterFields(tableFields, unfilteredFiels)
    const filteredFieldsWithValues = this.filterFieldsAndReturnValues(tableFields, _args, args)
    const response = await db(table)
      .select(filteredFields)
      .where(filteredFieldsWithValues)
      .orderBy(this.filterFields(tableFields, orderBy))
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.queries.filterNodes.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Filter Nodes : ID - ${arguments[3]}`)
      console.log(screenLines.endLine)
    }
    if (debug.queries.filterNodes.arguments) console.log(arguments)
    if (debug.queries.filterNodes.response) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Filter Nodes Response : ID - ${arguments[2]}`)
      console.log(screenLines.endLine)
      console.log('Filtered args:')
      console.log(filteredFieldsWithValues)
      console.log('Response:')
      console.log(response)
    }
    return response
  }
  public static async searchNode (table: string, tableFields: string[], unfilteredFiels: string[], search: string, args?: any, fields?: any, orderBy: any = ['id']) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    if (args) {
      const _args: string[] = Object.keys(args)
      const requestedFields = this.filterFields(tableFields, unfilteredFiels)
      const filteredArgs = this.filterFieldsAndReturnValues(tableFields, _args, args)
      const response = await db(table)
        .select(requestedFields)
        .whereRaw(`lower(concat(${fields})) ~ lower('\\m${search}')`)
        .andWhere(filteredArgs)
        .orderBy(this.filterFields(tableFields, orderBy))
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.searchNode.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Search Node : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.searchNode.arguments) console.log(arguments)
      if (debug.queries.searchNode.response) {
        console.log(screenLines.successDatabaseResponse)
        console.log(`DatabaseService : Search Node Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(requestedFields)
        console.log('Response:')
        console.log(response)
        console.log(screenLines.endLine)
      }
      return response
    }
    else {
      const requestedFields = this.filterFields(tableFields, unfilteredFiels)
      const response = await db(table)
        .select(requestedFields)
        .whereRaw(`lower(concat(${fields})) ~ lower('\\m${search}')`)
        .orderBy(this.filterFields(tableFields, orderBy))
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.searchNode.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Search Node : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.searchNode.arguments) console.log(arguments)
      if (debug.queries.searchNode.response) {
        console.log(screenLines.successDatabaseResponse)
        console.log(`DatabaseService : Search Node Response : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
        console.log('Filtered fields:')
        console.log(requestedFields)
        console.log('response:')
        console.log(response)
        console.log(screenLines.endLine)
      }
      return response
    }
  }
  public static async createNode (
    table: string,
    tableFields: string[],
    data: any,
    user: number
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    const fields: string[] = Object.keys(data.input)
    const _user = {
      createdBy: user,
      createdAt: 'now()',
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
      .insert(_data)
      .returning('*')
      .catch((err: Error) => {
        console.trace(err)
        return err
      })
    if (debug.mutations.createNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Create Node : ID - ${arguments[2]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.createNode.arguments) console.log(arguments)
    if (debug.mutations.createNode.response) {
      console.log(`DatabaseService :Create Node Response : ID - ${arguments[2]}`)
      console.log('Filtered data fields:')
      console.log(filteredFieldsWithValues)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async updateNode (
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
    if (debug.mutations.updateNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Update Node : ID - ${arguments[2]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.updateNode.arguments) console.log(arguments)
    if (debug.mutations.updateNode.response) {
      console.log(`DatabaseService : Update Node Response : ID - ${arguments[2]}`)
      console.log('Filtered data fields:')
      console.log(filteredFieldsWithValues)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async deleteNode (table: string, id: any, user: number) {
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
    if (debug.mutations.deleteNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Delete Node : ID - ${arguments[1]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.deleteNode.arguments) console.log(arguments)
    if (debug.mutations.deleteNode.response) {
      console.log(`DatabaseService : Delete Node Response : ID - ${arguments[1]}`)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async restoreNode (
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
    if (debug.mutations.restoreNode.name) {
      console.log(screenLines.endLine)
      console.log(`DatabaseService : Restore Node : ID - ${arguments[1]}`)
      console.log(screenLines.endLine)
    }
    if (debug.mutations.restoreNode.arguments) console.log(arguments)
    if (debug.mutations.restoreNode.response) {
      console.log(`DatabaseService : Restore Node Response : ID - ${arguments[1]}`)
      console.log('response:')
      console.log(response)
    }
    return response[0]
  }
  public static async getEdge (
    table: string,
    tableFields: string[],
    unfilteredFiels: string[],
    source: number,
    args?: any
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    const field: string[] = Object.keys(args)
    const requestedFields: string[] = this.filterFields(tableFields, unfilteredFiels)
    if (args) {
      if (args.createdAt || args.updatedAt || args.deletedAt || args.modifiedAt) {
        const range = args.createdAt || args.updatedAt || args.deletedAt || args.modifiedAt
        const queries: any = {
          'createdAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source }).first()
              .catch((err: Error) => console.trace(err))
            if (debug.queries.getEdge.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edge : ID - ${arguments[3]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdge.arguments) console.log(arguments)
            if (debug.queries.getEdge.response) {
              console.log(`DatabaseService : Get Edge Response : ID - ${arguments[3]}`)
              console.log('Filtered requested fields:')
              console.log(requestedFields)
              console.log('response:')
              console.log(response)
            }
            return response
          },
          'updatedAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source }).first()
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdge.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edge : ID - ${arguments[1]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdge.arguments) console.log(arguments)
            if (debug.queries.getEdge.response) {
              console.log(`DatabaseService : Get Edge Response : ID - ${arguments[3]}`)
              console.log('Filtered requested fields:')
              console.log(requestedFields)
              console.log('response:')
              console.log(response)
            }
            return response
          },
          'deletedAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source }).first()
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdge.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edge : ID - ${arguments[1]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdge.arguments) console.log(arguments)
            if (debug.queries.getEdge.response) {
              console.log(`DatabaseService : Get Edge Response : ID - ${arguments[3]}`)
              console.log('Filtered requested fields:')
              console.log(requestedFields)
              console.log('response:')
              console.log(response)
            }
            return response
          },
          'modifiedAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source }).first()
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdge.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edge : ID - ${arguments[3]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdge.arguments) console.log(arguments)
            if (debug.queries.getEdge.response) {
              console.log(`DatabaseService : Get Edge Response : ID - ${arguments[3]}`)
              console.log('Filtered requested fields:')
              console.log(requestedFields)
              console.log('response:')
              console.log(response)
            }
            return response
          }
        }
        return queries[field[0]]()
      } else {
        const _args = Object.keys(args)
        const filteredArgs = this.filterFieldsAndReturnValues(tableFields, _args, args)
        const response = await db(table)
          .where({ source })
          .andWhere(filteredArgs).first()
          .catch((err: Error) => {
            console.trace(err)
            return err
          })
        if (debug.queries.getEdge.name) {
          console.log(screenLines.endLine)
          console.log(`DatabaseService : Get Edge : ID - ${arguments[3]}`)
          console.log(screenLines.endLine)
        }
        if (debug.queries.getEdge.arguments) console.log(arguments)
        if (debug.queries.getEdge.response) {
          console.log(`DatabaseService : Get Edge Response : ID - ${arguments[3]}`)
          console.log('Filtered requested fields:')
          console.log(requestedFields)
          console.log('Filtered args:')
          console.log(filteredArgs)
          console.log('response:')
          console.log(response)
        }
        return response
      }
    } else {
      const response = await db(table)
        .select(requestedFields)
        .where({ source }).first()
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getEdge.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Edge : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getEdge.arguments) console.log(arguments)
      if (debug.queries.getEdge.response) {
        console.log(`DatabaseService : Get Edge Response : ID - ${arguments[3]}`)
        console.log('Filtered requested fields:')
        console.log(requestedFields)
        console.log('response:')
        console.log(response)
      }
      return response
    }
  }
  public static async getEdges (
    table: string,
    tableFields: string[],
    unfilteredFiels: string[],
    source: number,
    args?: any
  ) {
    if (!this.validateTable(table)) throw Error(`invalid table name: ${table}`)
    const requestedFields = this.filterFields(tableFields, unfilteredFiels)
    if (args) {
      const field: string[] = Object.keys(args)
      if (args.createdAt || args.updatedAt || args.deletedAt || args.modifiedAt) {
        const range = args.createdAt || args.updatedAt || args.deletedAt || args.modifiedAt
        const queries: { [key: string]: any } = {
          'createdAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source })
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdges.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edges : ID - ${arguments[3]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdges.arguments) console.log(arguments)
            if (debug.queries.getEdges.response) {
              console.log(`DatabaseService : Get Edges Response : ID - ${arguments[3]}`)
              console.log('Range:')
              console.log(range)
              console.log('response:')
              console.log(response)
            }
            return response
          },
          'updatedAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source })
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdges.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edge : ID - ${arguments[3]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdges.arguments) console.log(arguments)
            if (debug.queries.getEdges.response) {
              console.log(`DatabaseService : Get Edges Response : ID - ${arguments[3]}`)
              console.log('Range:')
              console.log(range)
              console.log('response:')
              console.log(response)
            }
            return response
          },
          'deletedAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source })
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdges.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edges : ID - ${arguments[3]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdges.arguments) console.log(arguments)
            if (debug.queries.getEdges.name) {
              console.log(`DatabaseService : Get Edges Response : ID - ${arguments[3]}`)
              console.log('Range:')
              console.log(range)
              console.log('response:')
              console.log(response)
            }
            return response
          },
          'modifiedAt': async () => {
            const response = await db(table)
              .select(requestedFields)
              .whereBetween(`${field}`, [range.start, range.end])
              .andWhere({ source })
              .catch((err: Error) => {
                console.trace(err)
                return err
              })
            if (debug.queries.getEdges.name) {
              console.log(screenLines.endLine)
              console.log(`DatabaseService : Get Edges : ID - ${arguments[3]}`)
              console.log(screenLines.endLine)
            }
            if (debug.queries.getEdges.arguments) console.log(arguments)
            if (debug.queries.getEdges.response) {
              console.log(`DatabaseService : Get Edges Response : ID - ${arguments[3]}`)
              console.log('Range:')
              console.log(range)
              console.log('response:')
              console.log(response)
            }
            return response
          }
        }
        return queries[field[0]]()
      } else {
        const _args = Object.keys(args)
        const filteredArgs = this.filterFieldsAndReturnValues(tableFields, _args, args)
        const response = await db(table)
          .select(requestedFields)
          .where({ source })
          .andWhere(filteredArgs)
          .catch((err: Error) => {
            console.trace(err)
            return err
          })
        if (debug.queries.getEdges.name) {
          console.log(screenLines.endLine)
          console.log(`DatabaseService : Get Edges : ID - ${arguments[3]}`)
          console.log(screenLines.endLine)
        }
        if (debug.queries.getEdges.arguments) console.log(arguments)
        if (debug.queries.getEdges.response) {
          console.log(`DatabaseService : Get Edges Response : ID - ${arguments[3]}`)
          console.log('Filtered requested fields:')
          console.log(requestedFields)
          console.log('Filtered args:')
          console.log(filteredArgs)
          console.log('response:')
          console.log(response)
        }
        return response
      }
    } else {
      const response = await db(table)
        .select(requestedFields)
        .where({ source })
        .catch((err: Error) => {
          console.trace(err)
          return err
        })
      if (debug.queries.getEdges.name) {
        console.log(screenLines.endLine)
        console.log(`DatabaseService : Get Edges : ID - ${arguments[3]}`)
        console.log(screenLines.endLine)
      }
      if (debug.queries.getEdges.arguments) console.log(arguments)
      if (debug.queries.getEdges.response) {
        console.log(`DatabaseService : Get Edges Response : ID - ${arguments[3]}`)
        console.log('Filtered requested fields:')
        console.log(requestedFields)
        console.log('response:')
        console.log(response)
      }
      return response
    }
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