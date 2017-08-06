import { DatabaseService } from './../../../services/database.service/database.service';
import { ProjectsQueries } from './projects.queries';

export class ProjectsService extends DatabaseService {
  public getAllProjects () {
    return this.selectAllRecords({ text: ProjectsQueries.projects.selectAllProjects });
  }
}
