const Queries = {
  projectTeams: {
    SELECT_ALL_PROJECT_TEAMS() {
      return `
      SELECT
        pt.*
      FROM
        projects.e_project_team_view pt;
      `;
    },
    INSERT_PROJECT_TEAM(projectTeam) {
      return `
      INSERT INTO projects.e_project_team (
        id,
        a_project_team_name,
        a_project_team_desc
      ) VALUES (
        ${projectTeam.id},
        '${projectTeam.aProjectTeamName}',
        ${convertData(projectTeam.aProjectTeamDesc)}
      ) RETURNING
        id,
        a_project_team_name "aProjectTeamName",
        a_project_team_desc "aProjectTeamDesc",
        is_deleted "isDeleted";
      `;
    },
    UPDATE_PROJECT_TEAM(projectTeam) {
      return `
      UPDATE
        projects.e_project_team
      SET
        a_project_team_name = '${projectTeam.aProjectTeamName}',
        a_project_team_desc = ${convertData(projectTeam.aProjectTeamDesc)}
      WHERE id = ${projectTeam.id}
      RETURNING
        id,
        a_project_team_name "aProjectTeamName",
        a_project_team_desc "aProjectTeamDesc",
        is_deleted "isDeleted";
      `;
    },
    DELETE_PROJECT_TEAM(projectTeam) {
      return `
      UPDATE
        projects.e_project_team
      SET
        is_deleted = true
      WHERE id = ${projectTeam.id}
      RETURNING
        id,
        a_project_team_name "aProjectTeamName",
        a_project_team_desc "aProjectTeamDesc",
        is_deleted "isDeleted";
      `;
    },
    RESTORE_PROJECT_TEAM(projectTeam) {
      return `
      UPDATE
        projects.e_project_team
      SET
        is_deleted = false
      WHERE id = ${projectTeam.id}
      RETURNING
        id,
        a_project_team_name "aProjectTeamName",
        a_project_team_desc "aProjectTeamDesc",
        is_deleted "isDeleted";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}