import { EdgesQueryConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
import { DatabaseService } from "../../index"
export async function getEdges (config: EdgesQueryConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  const requestedFields = DatabaseService.filterFields(config.tableFields, config.unfilteredFields)
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