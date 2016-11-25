'use strict';

const Queries = {
  projects: {
    SELECT_ALL_PROJECTS: function () {
      return `
      SELECT
        id,
        d_project_kind_id "projectKindID",
        e_customer_id "customerID",
        a_project_name "projectName",
        a_project_desc "projectDesc",
        e_contract_id "contractID",
        e_project_manager_id "projectManagerID",
        e_project_plan_id "projectPlanID",
        e_project_team_id "projectTeamID",
        a_official_project_name "officialProjectName",
        a_plan_start_date "planStartDate",
        a_plan_end_date "planEndDate",
        a_plan_budget "planBudget",
        a_fact_start_date "factStartDate",
        a_fact_end_date "factEndDate",
        a_fact_budget "factBudget",
        d_project_state_id "projectStateID",
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
    INSERT_PROJECT(project, user) {
      return `
      SELECT
        projects.create_project (
          v_d_project_kind_id := ${project.projectKindID},
          v_e_customer_id := ${project.customerID},
          v_a_project_name := '${project.projectName}',
          v_a_project_desc := '${project.projectDesc}',
          v_e_user_id := ${user.id}
        );
      `;
    }
  }
}

module.exports = Queries;
