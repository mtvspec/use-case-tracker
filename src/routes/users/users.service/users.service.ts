import { DatabaseService } from './../../../services/database.service/database.service';
import { UsersQueries } from './users.queries';
import { SessionQueries } from './../../sessions/sessions.service/sessions.queries';
import { User } from './../user';
import { UserCredentials } from './../credentials';

export class UsersService extends DatabaseService {
  public getAllUsers () {
    return this.selectAllRecords({ text: UsersQueries.users.selectAllUsers });
  }
  public getUserByUsername (username: string): Promise<any> {
    return this.selectRecord({ text: UsersQueries.users.selectUserByUsername(username) });
  }
  public getSessionByToken (token: string): Promise<any> {
    return this.selectRecord({ text: UsersQueries.users.selectSession(token) });
  }
  public closeSession (id: number) {
    return this.selectRecord({ text: SessionQueries.sessions.closeSession(id) });
  }
}
