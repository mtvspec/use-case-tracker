import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
export async function updateEdge (config) {
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
  if (debug.mutations.updateEdge.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Update Edge`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.updateEdge.arguments) console.log(arguments)
  if (debug.mutations.updateEdge.response) {
    console.log(`DatabaseService : Update Edge Response`)
    console.log('Filtered fields with values:')
    console.log(filteredFieldsWithValues)
    console.log('response:')
    console.log(response)
  }
  return response[0]
}