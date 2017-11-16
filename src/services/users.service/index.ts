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
    return this.getNodesCount(
      USERS_TABLE,
      null,
      null,
      { id: 0 }
    )
  }
  public static getAllUsers (unfilteredFields: any) {
    return this.getNodes(
      USERS_TABLE,
      userTableFields,
      unfilteredFields,
      null,
      { id: 0 }
    )
  }
  public static async getUser (unfilteredFields: any, id: number) {
    return this.getNode(
      USERS_TABLE,
      userTableFields,
      unfilteredFields,
      id
    )
  }
  public static async getUserPasswordByUsername (username: string) {
    return this.getNode(
      USERS_TABLE,
      userTableFields,
      ['id', 'password'],
      username
    )
  }
  public static getUserByUsername (username: string) {
    return this.getNode(
      USERS_TABLE,
      userTableFields,
      null,
      username
    )
  }
  public static getSessionByToken (token: string) {
    return this.getNode(
      SESSIONS_TABLE,
      SESSIONS_TABLE_FIESDS,
      [],
      token
    )
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