import {
  DatabaseService, QueryConfig
} from './../database.service'
import db from './../../knex'
const SESSIONS_TABLE: string = 'sessions.e_session'
import { queries } from './queries'
import { token } from 'morgan'

export interface ISession {
  user: number
  token: string
}

export class SessionsService extends DatabaseService {
  public static async getSession (token: string) {
    return await db(SESSIONS_TABLE)
      .where({ token }).first()
  }
  public static async openSession (data: ISession) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      
      INSERT INTO sessions.e_session (
        "user",
        "token"
      ) VALUES (
        ${data.user},
        '${data.token}'
      ) RETURNING *;

      `
    }))
  }
  public static async getUserIDBySessionToken (token: string) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.sessions.GET_USER_ID(token)
    }))
  }
  public static closeSession = async (session: number) => {
    // return await this.query(new QueryConfig({
    //   qty: 1,
    //   text: `

    //   UPDATE sessions.e_session
    //   SET
    //     "closedAt" = 'now()',
    //     state = 'C'
    //   WHERE id = ${session}
    //   RETURNING *;

    //   `
    // }))
    return await db(SESSIONS_TABLE)
      .update({ closedAt: 'now()' })
      .where({ session })
      .returning('*').first()
  }
  public static async validateToken (token: string) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `

      SELECT
        s.*
      FROM
        ${SESSIONS_TABLE} s
      WHERE state = 'O'
      AND token = '${token}';
      
      `
    }))
  }
  public static getSessionBySessionToken = async (token: string) => {
    return await db(SESSIONS_TABLE)
      .where({ token })
      .first()
  }
  public static refreshToken = async (id: number) => {
    return await db(SESSIONS_TABLE)
      .update({ renewedAt: 'now()' })
      .where({ id })
      .returning('*').first()
  }
}
