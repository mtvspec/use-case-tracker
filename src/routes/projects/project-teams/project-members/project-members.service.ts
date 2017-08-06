import { DatabaseService } from './../../../../services/database.service/database.service';
import { ProjectMembersQueries } from './project-members.queries';

export class ProjectMembersService extends DatabaseService {
  public getAllProjectMembers (id: number) {
    return this.selectAllRecords({ text: ProjectMembersQueries.selectAllProjectMembers(id) });
  }
  public getProjectMember (id: number) {
    return this.selectRecord({ text: ProjectMembersQueries.selectProjectMember(id) });
  }
}
