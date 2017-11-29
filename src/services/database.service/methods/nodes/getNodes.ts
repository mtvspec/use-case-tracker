import { debug } from './../../debug.config'
import db from './../../../../knex'
import { screenLines } from './../../messages'
import { NodesQueryConfig } from '../../interfaces'
import { DatabaseService } from './../../index'

export async function getNodes (config: NodesQueryConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  if (!config.tableFields) throw Error('table fields is required')
  if (!config.unfilteredFields) throw Error('requested fields is required')
  if (!config.fields) config.fields = []
  const requestedFields = DatabaseService.filterFields(config.tableFields, config.unfilteredFields)
  let args = [], filter = [], except = [], search = [], orderBy = ['id']
  if (config.args && Object.keys(config.args).length > 0) {
    args = DatabaseService.filterFieldsAndReturnValues(
      config.tableFields,
      Object.keys(config.args),
      config.args
    )
    if (!args) args = []
  }
  if (config.filter && Object.keys(config.filter).length > 0) {
    filter = DatabaseService.filterFieldsAndReturnValues(
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
    except = DatabaseService.filterFieldsAndReturnValues(
      config.tableFields,
      Object.keys(config.except),
      config.except
    )
    if (!except) except = []
  }
  if (config.orderBy && Object.keys(config.orderBy).length > 0) {
    orderBy = DatabaseService.filterFields(
      config.tableFields,
      config.orderBy
    )
    if (!orderBy) orderBy = ['id']
  }
  const response = await db(config.table)
    .select(requestedFields)
    .where(args)
    .andWhere(filter)
    .whereNot(except)
    .whereRaw(search)
    .orderBy(orderBy)
    .catch((err: Error) => {
      console.trace(err)
      return err
    })
  if (debug.queries.getNodes.name) {
    console.log(screenLines.dashedLine)
    console.log(screenLines.endLine)
    console.log(`Called at: ${new Date()}`)
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Get Nodes`)
    console.log(screenLines.endLine)
  }
  if (debug.queries.getNodesCount.arguments) console.log(arguments)
  if (debug.queries.getNodesCount.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Get Nodes Response`)
    console.log(screenLines.endLine)
    console.log('Filtered requested fields:')
    console.log(requestedFields)
    console.log('Filtered args:')
    console.log(args)
    console.log('Filtered filter:')
    console.log(filter)
    console.log('Filtered except:')
    console.log(except)
    console.log('Filtered search:')
    console.log(search)
    console.log('Search fields:')
    console.log(config.fields)
    console.log('Filtered orderBy:')
    console.log(orderBy)
    console.log(screenLines.endLine)
    console.log('Response data:')
    console.log(screenLines.endLine)
    console.log(response)
    console.log(screenLines.endLine)
    console.log(screenLines.dashedLine)
  }
  if (response === undefined) return null
  else return response
}