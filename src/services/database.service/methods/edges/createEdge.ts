import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
import { DatabaseService } from "../../index";
export async function createEdge (config) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  const fields: string[] = Object.keys(config.data)
  const user = {
    createdBy: config.user,
    createdAt: 'now()',
    modifiedBy: config.user
  }
  const filteredFieldsWithValues = DatabaseService.filterFieldsAndReturnValues(
    config.tableFields,
    fields,
    config.data
  )
  const data = Object.assign({}, filteredFieldsWithValues, user)
  const response = await db(config.table)
    .where({ id: data.id })
    .insert(data)
    .returning('*')
    .catch((err: Error) => {
      console.trace(err)
      return err
    })
  if (debug.mutations.createEdge.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Create Edge`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.createEdge.arguments) console.log(arguments)
  if (debug.mutations.createEdge.response) {
    console.log(`DatabaseService : Create Edge Response`)
    console.log('Filtered fields with values:')
    console.log(filteredFieldsWithValues)
    console.log('response:')
    console.log(response)
  }
  return response[0]
}