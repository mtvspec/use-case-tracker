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
  public static async authentificateUser (credentials: ICredentials) {
    return await new Promise(async (resolve, reject) => {
      let result = await this.authentificate(credentials);
      if (!result) reject(false);
      const userID: number = <number>result;
      await resolve(await this.openSession(userID));
    });
  }
  private static async authentificate (credentials: ICredentials):
    Promise<number | false> {
    const response = await <any>UsersService.getUserPasswordByUsername(credentials.username)
    return response.id && response.id > 0 ?
      (bcrypt.compareSync(credentials.password, response.password) ?
        response.id : false)
      : false;
  }
  private static async openSession (user: number):
    Promise<ISession | boolean> {
    const token: string = uuid();
    const response = await <any>SessionsService.openSession({ user, token });
    return (response.id && response.id > 0) ?
      response : false;
  }
}