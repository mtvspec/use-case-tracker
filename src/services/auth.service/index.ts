const uuid = require('uuid/v4');
const bcrypt = require('bcrypt-nodejs');
import { UsersService } from './../users.service';
import { SessionsService, ISession } from './../sessions.service';
interface ICredentials {
  username: string;
  password: string;
}
export default class AuthService {
  private credentials: ICredentials;
  public static async authentificateUser (config) {
    return await new Promise(async (resolve, reject) => {
      let result = await this.authentificate(config);
      if (!result) reject(false);
      const user = { id: <number>result }
      resolve(await this.openSession(user.id));
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
    return (response && response.id && response.id > 0) ?
      (bcrypt.compareSync(config.credentials.password, response.password) ?
        response.id : false)
      : false;
  }
  private static async openSession (user: number):
    Promise<ISession | boolean> {
    const token: string = uuid()
    const response = await <any>SessionsService.openSession({ user, token })
    console.log(response)
    return (response.id && response.id > 0) ?
      response : false;
  }
}