import { EdgeQueryConfig } from "../../interfaces"
import { DatabaseService } from "../../index"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
export async function getEdge (config: EdgeQueryConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  let args = []
  if (config.args && Object.keys(config.args).length > 0) {
    args = DatabaseService.filterFieldsAndReturnValues(
      config.tableFields,
      Object.keys(config.args),
      config.args
    )
    if (Object.keys(args).length === 0) args = []
  }
  const requestedFields: string[] = DatabaseService.filterFields(config.tableFields, config.unfilteredFields)
  const filteredSource = DatabaseService.filterFieldsAndReturnValues(config.tableFields, Object.keys(config.source), config.source)
  if (Object.keys(filteredSource).length === 0) throw Error('source field required')
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
  if (debug.queries.getEdge.arguments) {
    console.log(arguments)
    console.log(screenLines.endLine)
  }
  if (debug.queries.getEdge.response) {
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
  else return response
}