import { debug } from "../../debug.config"
import { screenLines } from "../../messages"
import db from './../../../../knex'
export async function deleteEdge (config) {
  if (!this.validateTable(config.table)) throw Error(`invalid table name: ${config.table}`)
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
      console.trace(err)
      return err
    })
  if (debug.mutations.deleteEdge.name) {
    console.log(screenLines.endLine)
    console.log(`DatabaseService : Delete Node`)
    console.log(screenLines.endLine)
  }
  if (debug.mutations.deleteEdge.arguments) console.log(arguments)
  if (debug.mutations.deleteEdge.response) {
    console.log(`DatabaseService : Delete Edge Response`)
    console.log('response:')
    console.log(response)
  }
  return response[0]
}