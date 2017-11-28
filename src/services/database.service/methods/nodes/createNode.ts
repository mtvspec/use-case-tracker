import { NodeMutationConfig } from "../../interfaces"
import { screenLines } from "../../messages"
import { debug } from "../../debug.config"
import db from './../../../../knex'

export async function createNode (config: NodeMutationConfig) {
  if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  const fields: string[] = Object.keys(config.data.input)
  const filteredUserInput = this.filterFieldsAndReturnValues(
    config.tableFields,
    fields,
    config.data.input
  )
  const USER = {
    createdBy: config.user,
    modifiedBy: config.user
  }
  const DATA = Object.assign({}, filteredUserInput, USER)
  const response = await db(config.table)
    .insert(DATA)
    .where({ id: DATA.id })
    .returning('*')
    .catch((err: Error) => {
      console.trace(err)
      return err
    })
  if (debug.mutations.createNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Create Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.createNode.arguments) console.log(arguments)
  if (debug.mutations.createNode.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService :Create Node Response`)
    console.log(screenLines.endLine)
    console.log('Filtered data fields:')
    console.log(filteredUserInput)
    console.log('response:')
    console.log(response)
  }
  if (response && response.id > 0) return response[0]
  else if (response === undefined) return null
  return response[0]
}