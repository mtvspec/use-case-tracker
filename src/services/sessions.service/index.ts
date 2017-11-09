import {
  DatabaseService, QueryConfig
} from './../database.service'
import db from './../../knex'
const sessionsTable: string = 'sessions.e_session'
import { queries } from './queries'
export class SessionsService extends DatabaseService {
  public static async getSession (id: number) {

  }
  public static async openSession (data: { userID: number, token: string }):
    Promise<any> {
    return await db(sessionsTable)
      .insert(data)
      .returning('*').first()
  }
  public static async getUserIDBySessionToken (token: string):
    Promise<any> {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.sessions.GET_USER_ID(token)
    }))
  }
  public static async closeSession (userID: number):
    Promise<any> {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.sessions.CLOSE_SESSION(userID)
    }))
  }
  public static validateToken = async (token: string) => {
    return await db
      .from(sessionsTable)
      .where({ stateID: 'O', token })
      .first()
  }
  public static getSessionBySessionToken = async (token: string) => {
    return await db
      .from(sessionsTable)
      .where({ token })
      .first()
  }
  public static refreshToken = async (id: number) => {
    return await db(sessionsTable)
      .update({ renewedAt: 'now()' })
      .where({ id })
      .returning('*').first()
  }
}
