import {
  DatabaseService, QueryConfig
} from './../database.service'
const usersTable: string = 'users.e_user'
const totalCount: string = 'id as totalCount'
import db from './../../knex'
import queries from './queries'
import { SessionsService } from './../sessions.service'

let userTableFields = []

export class UsersService extends DatabaseService {
  public static async getUsersCount () {
    return await db(usersTable)
      .whereNot({ id: 0 })
      .count(totalCount).first()
  }
  public static async getAllUsers (unfilteredFields: any) {
    const filterFields = (field) => { return (userTableFields.indexOf(field) > -1) }
    let filteredFields = unfilteredFields.filter(filterFields)
    return await db(usersTable)
      .select(filteredFields)
      .whereNot({ id: 0 })
      .orderBy('id')
  }
  public static async getUser (unfilteredFields: any, id: number) {
    const filterFields = (field) => { return (userTableFields.indexOf(field) > -1) }
    let filteredFields = unfilteredFields.filter(filterFields)
    return await db
      .select(filteredFields)
      .from(usersTable)
      .where({ id }).first()
  }
  public static async getUserPasswordByUsername (username: string) {
    return await db
      .select('id', 'password')
      .from(usersTable)
      .where({ username }).first()
  }
  public static async getUserByUsername (username: string):
    Promise<any> {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.users.SELECT_USER_BY_USERNAME(username)
    }))
  }
  public static async getSessionByToken (token: string):
    Promise<any> {
    return await SessionsService.getSessionBySessionToken(token)
  }
  public static async closeSession (id: number):
    Promise<any> {
    return await SessionsService.closeSession(id)
  }
}

const getFields = (async () => {
  const response: any = await <any>UsersService.fields(usersTable)
  response.forEach((field: any) => userTableFields.push(field.name))
})()