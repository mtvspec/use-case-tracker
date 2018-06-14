import { debug } from "../../debug.config"
import db from './../../../../knex'
import { DatabaseService } from "../../index"
export async function restoreEdge (config) {
  if (!DatabaseService.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
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
  if (debug.mutations.restoreEdge.name) console.log(`DatabaseService : Restore Edge`)
  if (debug.mutations.restoreEdge.arguments) console.log(arguments)
  if (debug.mutations.restoreEdge.name) {
    console.log(`DatabaseService : Restore Edge Response`)
    console.log('response:')
    console.log(response)
  }
  return response[0]
}