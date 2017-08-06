import { DatabaseService } from './../../../services/database.service/database.service';

import { ProjectTeamsQueries } from './project-teams.queries';

export class ProjectTeamsService extends DatabaseService {
  getAllProjectTeams (id: number) {
    return this.selectAllRecords({ text: ProjectTeamsQueries.selectAllProjectTeams(id) });
  }
}