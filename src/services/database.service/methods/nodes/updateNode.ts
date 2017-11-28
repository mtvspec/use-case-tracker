import { NodeMutationConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
export async function updateNode (config: NodeMutationConfig) {
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
  if (debug.mutations.updateNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Update Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.updateNode.arguments) console.log(arguments)
  if (debug.mutations.updateNode.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Update Node Response`)
    console.log(screenLines.endLine)
    console.log('Filtered data fields:')
    console.log(filteredFieldsWithValues)
    console.log('response:')
    console.log(response)
  }
  if (response && response.id > 0) return response[0]
  else if (response === undefined) return null
  return response[0]
}