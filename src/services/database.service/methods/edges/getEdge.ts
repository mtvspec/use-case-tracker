import { EdgeQueryConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
export async function getEdge (config: EdgeQueryConfig) {
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