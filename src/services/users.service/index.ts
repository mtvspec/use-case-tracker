import {
  DatabaseService
} from './../database.service'
const USERS_TABLE: string = 'users.e_user'
const SESSIONS_TABLE: string = 'sessions.e_session'
import { SessionsService } from './../sessions.service'

let userTableFields: string[] = []
let SESSIONS_TABLE_FIESDS: string[] = []

export class UsersService extends DatabaseService {
  public static async getUsersCount () {
    return this.getNodesCount({
      table: USERS_TABLE,
      tableFields: userTableFields,
      args: null,
      except: { id: 0 }
    })
  }
  public static getAllUsers (
    unfilteredFields: string[],
    args?,
    except?,
    orderBy?
  ) {
    return this.getNodes({
      table: USERS_TABLE,
      tableFields: userTableFields,
      unfilteredFields,
      args,
      except,
      orderBy
    })
  }
  public static async getUser (unfilteredFields: string[], args) {
    return this.getNode({
      table: USERS_TABLE,
      tableFields: userTableFields,
      unfilteredFields,
      args
    })
  }
  public static async getUserPasswordByUsername (args) {
    return this.getNode({
      table: USERS_TABLE,
      tableFields: userTableFields,
      unfilteredFields: ['id', 'password'],
      args
    })
  }
  public static getUserByUsername (args) {
    return this.getNode({
      table: USERS_TABLE,
      tableFields: userTableFields,
      unfilteredFields: null,
      args
    })
  }
  public static getSessionByToken (args) {
    return this.getNode({
      table: SESSIONS_TABLE,
      tableFields: SESSIONS_TABLE_FIESDS,
      unfilteredFields: [],
      args
    })
  }
  public static async closeSession (id: number) {
    return await SessionsService.closeSession(id)
  }
}

const getUserTableFields = (async () => {
  const response: any[] = await <any>UsersService.fields(USERS_TABLE)
  if (response && response.length > 0) userTableFields = response
  else console.trace(response)
})()