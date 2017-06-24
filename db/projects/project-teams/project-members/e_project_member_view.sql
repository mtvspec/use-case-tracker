CREATE OR REPLACE VIEW projects.e_project_member_view
AS
SELECT
  id,
  e_project_team_id "eProjectTeamID",
  e_person_id "ePersonID",
  d_project_member_state_id "dProjectMemberStateID",
  is_deleted "isDeleted"
FROM
  projects.e_project_member
ORDER BY
  id ASC;