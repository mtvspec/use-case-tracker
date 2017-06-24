CREATE OR REPLACE VIEW projects.e_project_team_view
AS
SELECT
  t.id,
  t.a_project_team_name "aProjectTeamName",
  t.a_project_team_desc "aProjectTeamDesc",
  t.is_deleted "isDeleted"
FROM
  projects.e_project_team t
ORDER BY
  id ASC;