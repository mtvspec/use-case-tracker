import { NodeConfig } from "../../interfaces"
import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
import { DatabaseService } from "../../index"

export async function deleteNode (config: NodeConfig) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
  if (!config.id) throw Error('id required')
  const user = {
    deletedBy: config.user,
    deletedAt: 'now()',
    modifiedBy: config.user
  }
  const data = Object.assign({}, { isDeleted: true }, user)
  const response = await db(config.table)
    .where({ id: config.id })
    .update(data)
    .returning('*')
    .catch((err: Error) => {
      console.error(err)
      return err
    })
  if (debug.mutations.deleteNode.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Delete Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.deleteNode.arguments) {
    console.log(arguments)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.deleteNode.response) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Delete Node Response`)
    console.log(screenLines.endLine)
    console.log('response:')
    console.log(response)
  }
  if (response[0] && response[0].id > 0) return response[0]
  else if (response === undefined) return null
  else return response
}