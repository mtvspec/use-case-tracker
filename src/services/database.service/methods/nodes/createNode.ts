import { CreateNodeMutationConfig } from "../../interfaces"
import { screenLines } from "../../messages"
import { debug } from "../../debug.config"
import db from './../../../../knex'
import { DatabaseService } from "../../index"

export async function createNode (config: CreateNodeMutationConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  const filteredUserInput = DatabaseService.filterFieldsAndReturnValues(
    config.tableFields,
    Object.keys(config.data.input),
    config.data.input
  )
  const user = {
    createdBy: config.user,
    modifiedBy: config.user
  }
  const data = Object.assign({}, filteredUserInput, user)
  const response = await db(config.table)
    .insert(data)
    .where({ id: data.id })
    .returning('*')
    .catch((err: Error) => {
      console.error(err)
      return err
    })
  if (debug.mutations.createNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Create Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.createNode.arguments) {
    console.log(arguments)
  }
  if (debug.mutations.createNode.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService :Create Node Response`)
    console.log(screenLines.endLine)
    console.log('Filtered data fields:')
    console.log(filteredUserInput)
    console.log(screenLines.endLine)
    console.log('Response:')
    console.log(screenLines.endLine)
    console.log(response)
    console.log(screenLines.endLine)
  }
  if (response[0] && response[0].id > 0) return response[0]
  else if (response === undefined) return null
  else return response
}