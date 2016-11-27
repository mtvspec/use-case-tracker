'use strict';

const Queries = {
  projects: {
    SELECT_ALL_PROJECTS: function () {
      return `
      SELECT
        id,
        d_project_kind_id "aProjectKindID",
        e_customer_id "aCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "aContractID",
        e_project_manager_id "aProjectManagerID",
        e_project_plan_id "aProjectPlanID",
        e_project_team_id "aProjectTeamID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "aProjectStateID",
        is_deleted "isDeleted"
      FROM
        projects.e_project
      ORDER BY
        id
      ASC;
      `;
    },
    SELECT_PROJECT_BY_ID: function (id) {
      return `
      SELECT
        *
      FROM
        projects.e_project
      WHERE
        id = ${id};
      `;
    },
    INSERT_PROJECT(project, session, user) {
      console.log(project);
      return `
      SELECT
        projects.create_project (
          v_d_project_kind_id := ${project.aProjectKindID},
          v_e_customer_id := ${project.aCustomerID},
          v_a_project_name := '${project.aProjectName}',
          v_a_project_desc := '${project.aProjectDesc}',
          v_e_session_id := ${session.id},
          v_e_user_id := ${user.id}
        );
      `;
    }
  }
}

module.exports = Queries;
