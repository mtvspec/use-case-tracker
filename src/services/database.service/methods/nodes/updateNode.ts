import { UpdateNodeMutationConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
import { DatabaseService } from "../../index"
export async function updateNode (config: UpdateNodeMutationConfig) {
  console.log(config)
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  const target = DatabaseService.filterFieldsAndReturnValues(
    config.tableFields,
    Object.keys(config.target),
    config.target
  )
  const user = {
    updatedBy: config.user,
    updatedAt: 'now()',
    modifiedBy: config.user
  }
  const filteredFieldsWithValues = DatabaseService.filterFieldsAndReturnValues(
    config.tableFields,
    Object.keys(config.data),
    config.data
  )
  const data = Object.assign({}, filteredFieldsWithValues, user)
  const response = await db(config.table)
    .where(target)
    .update(data)
    .returning('*')
    .catch((err: Error) => {
      console.error(err)
      return err
    })
  if (debug.mutations.updateNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Update Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.updateNode.arguments) {
    console.log(arguments)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.updateNode.response) {
    console.log(`DatabaseService : Update Node Response`)
    console.log(screenLines.endLine)
    console.log('Filtered data fields:')
    console.log(filteredFieldsWithValues)
    console.log(screenLines.endLine)
    console.log('response:')
    console.log(response)
    console.log(screenLines.endLine)
  }
  console.log(response)
  if (response[0] && response[0].id > 0) return response[0]
  else if (response === undefined) return null
  else return response
}