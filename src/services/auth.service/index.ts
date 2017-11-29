const uuid = require('uuid/v4')
const bcrypt = require('bcrypt-nodejs')
import { UsersService } from './../users.service'
import { SessionsService, ISession } from './../sessions.service'
interface ICredentials {
  username: string
  password: string
}
export default class AuthService {
  private credentials: ICredentials
  public static async authentificateUser (config) {
    return await new Promise(async (resolve, reject) => {
      const result = await this.authentificate(config)
      if (!result) return reject(false)
      const user = { id: <number>result }
      resolve(await this.openSession(user.id))
    });
  }
  private static async authentificate (config):
    Promise<number | false> {
    const response = await <any>UsersService.getUserPasswordByUsername({
      table: 'users.e_user',
      tableFields: UsersService.UserConfig.tableFields,
      unfilteredFields: ['id', 'password'],
      source: { username: config.credentials.username }
    })
    console.log(response)
    const password = bcrypt.hashSync(config.credentials.password)
    console.log(password)
    console.log(bcrypt.compareSync(config.credentials.password, response.password))

    return (response && response.id && response.id > 0) ?
      (bcrypt.compareSync(config.credentials.password, response.password) ?
        response.id : false)
      : false
  }
  private static async openSession (user: number):
    Promise<ISession | boolean> {
    const token: string = uuid()
    const response = await <any>SessionsService.openSession({ user, token })
    console.log(response)
    return (response.id && response.id > 0) ?
      response : false
  }
}