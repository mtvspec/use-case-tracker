import { NodeConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
export async function restoreNode (config: NodeConfig) {
  if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  if (!config.id) throw Error('id required')
  const user = {
    restoredBy: config.user,
    restoredAt: 'now()',
    modifiedBy: config.user
  }
  const data = Object.assign({}, { isDeleted: false }, user)
  const response = await db(config.table)
    .where({ id: config.id })
    .update(data)
    .returning('*')
    .catch((err: Error) => {
      console.trace(err)
      return err
    })
  if (debug.mutations.restoreNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Restore Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.restoreNode.arguments) console.log(arguments)
  if (debug.mutations.restoreNode.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Restore Node Response`)
    console.log(screenLines.endLine)
    console.log('response:')
    console.log(response)
  }
  if (response && response.id > 0) return response
  else if (response === undefined) return null
  return response[0]
}