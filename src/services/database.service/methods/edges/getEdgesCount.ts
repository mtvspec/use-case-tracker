import { EdgesCountQueryConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
import { DatabaseService } from "../../index"
export async function getEdgesCount (config: EdgesCountQueryConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  const filteredSource = DatabaseService.filterFieldsAndReturnValues(config.tableFields, Object.keys(config.source), config.source)
  const response = await db(config.table)
    .where(filteredSource)
    .count('id as totalCount').first()
    .catch(err => {
      console.error(err)
      return err
    })
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