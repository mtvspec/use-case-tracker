import { NodesCountQueryConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
import { DatabaseService } from "../../index"

export async function getNodesCount (config: NodesCountQueryConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  let args = [], filter = [], except = [], search = []
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
  const response = await db(config.table)
    .where(args)
    .andWhere(filter)
    .whereNot(except)
    .whereRaw(search)
    .count('id as totalCount').first()
    .catch((err: Error) => {
      console.error(err)
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