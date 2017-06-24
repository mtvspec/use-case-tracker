const Queries = {
  projectMembers: {
    SELECT_ALL_PROJECT_MEMBERS() {
      return `
      SELECT
        pm.*
      FROM
        projects.e_project_member_view pm;
      `;
    },
    INSERT_PROJECT_MEMBER(projectMember) {
      return `
      INSERT INTO projects.e_project_member (
        e_project_team_id,
        e_person_id,
        d_project_member_state_id
      ) VALUES (
        ${projectMember.eProjectTeamID},
        ${projectMember.ePersonID},
        141
      ) RETURNING
        id,
        e_project_team_id "eProjectTeamID",
        e_person_id "ePersonID",
        d_project_member_state_id "dProjectMemberStateID",
        is_deleted "isDeleted";
      `;
    },
    UPDATE_PROJECT_MEMBER(projectMember) {
      return `
      UPDATE
        projects.e_project_member
      SET
        e_project_team_id = ${projectMember.eProjectTeamID},
        e_person_id = ${projectMember.ePersonID},
        d_project_member_state_id = ${projectMember.dProjectMemberStateID}
      WHERE id = ${projectMember.id}
      RETURNING
        id,
        e_project_team_id "eProjectTeamID",
        e_person_id "ePersonID",
        d_project_member_state_id "dProjectMemberStateID",
        is_deleted "isDeleted";
      `;
    },
    DELETE_PROJECT_MEMBER(projectMember) {
      return `
      UPDATE
        projects.e_project_member
      SET
        is_deleted = true
      WHERE id = ${projectMember.id}
      RETURNING
        id,
        e_project_team_id "eProjectTeamID",
        e_person_id "ePersonID",
        d_project_member_state_id "dProjectMemberStateID",
        is_deleted "isDeleted";
      `;
    },
    RESTORE_PROJECT_MEMBER(projectMember) {
      return `
      UPDATE
        projects.e_project_member
      SET
        is_deleted = false
      WHERE id = ${projectMember.id}
      RETURNING
        id,
        e_project_team_id "eProjectTeamID",
        e_person_id "ePersonID",
        d_project_member_state_id "dProjectMemberStateID",
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