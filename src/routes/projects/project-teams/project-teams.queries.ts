export const ProjectTeamsQueries = {
  selectAllProjectTeams (id) {
    return `
    SELECT
      *
    FROM
      projects.e_project_team
    WHERE
      id = ${id}
    ORDER BY id;
    `;
  }
}