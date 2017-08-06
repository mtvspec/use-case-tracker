import { DatabaseService } from './../../../services/database.service/database.service';
import { IssuesQueries } from './issues.queries';

import { Issue } from './../issue';

export class IssuesService extends DatabaseService {
  public getAllIssues () {
    return this.selectAllRecords({ text: IssuesQueries.issues.selectAllIssues() });
  }
  public getIssue (id: number) {
    return this.selectRecord({ text: IssuesQueries.issues.selectIssueByID(+id) });
  }
  public postIssue (issue: Issue) {
    return this.insertRecord({ text: IssuesQueries.issues.insertIssue(issue) });
  }
  public updateIssue (issue: Issue) {
    return this.updateRecord({ text: IssuesQueries.issues.updateIssue(issue) });
  }
  public closeIssue (id: number) {
    return this.selectRecord({ text: IssuesQueries.issues.closeIssue(+id) });
  }
  public openIssue (id: number) {
    return this.selectRecord({ text: IssuesQueries.issues.openIssue(+id) });
  }
}
