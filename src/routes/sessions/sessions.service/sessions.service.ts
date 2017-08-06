import { DatabaseService } from './../../../services/database.service/database.service';
import { SessionQueries } from './sessions.queries';

export class SessionsService extends DatabaseService {
  public openSession( data: { eUserID: number, aToken: string } ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.insertRecord({ text: SessionQueries.sessions.openSession(data) })
      .then(result => resolve(result))
      .catch(err => reject(err));
    });
  }
}
