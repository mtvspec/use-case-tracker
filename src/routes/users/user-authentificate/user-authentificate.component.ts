import { UserCredentials } from './user-credentials';
import { UsersService } from './../users.service/users.service';
import { SessionsService } from './../../sessions/sessions.service/sessions.service';
import { Session } from './../../sessions/session';

const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid');

const ss = new SessionsService();
const us = new UsersService();

export class UserAuthentificationComponent {
  private credentials: UserCredentials;

  public static authentificateUser (credentials: UserCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      us.getUserByUsername(credentials.username)
        .then(response => {
          if (response.status === 200) {
            // compare password
            if (!bcrypt.compareSync(credentials.password, response.data.password)) reject(false);
            else {
              // open session
              const User = response.data;
              const aToken = uuid.v4();
              ss.openSession({ eUserID: User.id, aToken: aToken })
                .then(session => resolve(session))
                .catch(err => reject(err));
            }
          } else {
            reject(false);
          }
        })
        .catch(error => reject(false));
    });
  }
}
