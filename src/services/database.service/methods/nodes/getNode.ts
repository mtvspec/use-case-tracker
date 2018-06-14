import { NodeQueryConfig } from './../../interfaces'
import { screenLines } from '../../messages'
import { debug } from '../../debug.config'
import db from './../../../../knex'
import { DatabaseService } from '../../index'

export async function getNode (config: NodeQueryConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  if (!config.unfilteredFields) throw Error('requested fields is required')
  if (!config.source) throw Error('node id required')
  const source = DatabaseService.filterFieldsAndReturnValues(config.tableFields, Object.keys(config.source), config.source)
  const requestedFields = DatabaseService.filterFields(config.tableFields, config.unfilteredFields)
  let args = [], filter = [], except = [], search = []
  if (config.args && Object.keys(config.args).length > 0) {
    args = DatabaseService.filterFieldsAndReturnValues(
      config.tableFields,
      Object.keys(config.args),
      config.args
    )
    if (Object.keys(args).length === 0) args = []
  }
  if (config.filter && Object.keys(config.filter).length > 0) {
    filter = DatabaseService.filterFieldsAndReturnValues(
      config.tableFields,
      Object.keys(config.filter),
      config.filter
    )
    if (Object.keys(filter).length === 0) filter = []
  }
  if (config.except && Object.keys(config.except).length > 0) {
    except = DatabaseService.filterFieldsAndReturnValues(
      config.tableFields,
      Object.keys(config.except),
      config.except
    )
    if (Object.keys(except).length === 0) except = []
  }
  const response = await db(config.table)
    .select(requestedFields)
    .where(source)
    .andWhere(args)
    .andWhere(filter)
    .whereNot(except).first()
    .catch(err => {
      console.error(err)
      return err
    })
  if (debug.queries.getNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Get Node`)
    console.log(screenLines.endLine)
  }
  if (debug.queries.getNode.arguments) {
    console.log(arguments)
    console.log(screenLines.endLine)
  }
  if (debug.queries.getNode.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Get Node Response`)
    console.log(screenLines.endLine)
    console.log(arguments)
    console.log(screenLines.endLine)
    console.log('Filtered requested fields:')
    console.log(requestedFields)
    console.log('Filtered args:')
    console.log(args)
    console.log('Filtered filter:')
    console.log(filter)
    console.log('Filtered except:')
    console.log(except)
    console.log('Response:')
    console.log(response)
    console.log(screenLines.endLine)
  }
  if (response && response.id > 0) return response
  else if (response === undefined) return null
  else return response
}