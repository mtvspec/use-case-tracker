import * as uuid from 'uuid';
const bcrypt = require('bcrypt-nodejs');
import { UsersService } from './../users.service';
import { SessionsService } from './../sessions.service';
interface ICredentials {
  username: string;
  password: string;
}
export class AuthService {
  private credentials: ICredentials;
  private _uuid: uuid;
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
  private static async openSession (userID: number):
    Promise<{ userID: number, token: string } | boolean> {
    const token: string = uuid.v4();
    const response = await <any>SessionsService.openSession({ userID, token });
    return (response.id && response.id > 0) ?
      response : false;
  }
}