'use strict';

const Queries = {
  projects: {
    SELECT_ALL_PROJECTS() {
      return `
      SELECT
        id,
        d_project_kind_id "dProjectKindID",
        e_customer_id "eCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "eContractID",
        e_project_manager_id "eProjectManagerID",
        e_project_plan_id "eProjectPlanID",
        e_project_team_id "eProjectTeamID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "dProjectStateID",
        is_deleted "isDeleted"
      FROM
        projects.e_project
      ORDER BY
        id ASC;
      `;
    },
    SELECT_PROJECT_BY_ID(project) {
      return `
      SELECT
        id,
        d_project_kind_id "dProjectKindID",
        e_customer_id "eCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "eContractID",
        e_project_manager_id "eProjectManagerID",
        e_project_plan_id "eProjectPlanID",
        e_project_team_id "eProjectTeamID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "dProjectStateID",
        is_deleted "isDeleted"
      FROM
        projects.e_project
      WHERE id = ${project};
      `;
    },
    INSERT_PROJECT(project) {
      return `
      INSERT INTO projects.e_project (
        d_project_kind_id,
        e_customer_id,
        a_project_name,
        a_project_desc,
        e_contract_id,
        e_project_manager_id,
        e_project_plan_id,
        e_project_team_id,
        a_official_project_name,
        a_plan_start_date,
        a_plan_end_date,
        a_plan_budget,
        a_fact_start_date,
        a_fact_end_date,
        a_fact_budget,
        d_project_state_id
      ) VALUES (
        ${convertData(project.dProjectKindID)},
        ${convertData(project.eCustomerID)},
        '${project.aProjectName}',
        ${convertData(project.eContractID)},
        ${convertData(project.aProjectDesc)},
        ${convertData(project.eProjectManagerID)},
        ${convertData(project.eProjectPlanID)},
        ${convertData(project.eProjectTeamID)},
        ${convertData(project.aOfficialProjectName)},
        ${convertData(project.aPlanStartDate)},
        ${convertData(project.aPlanEndDate)},
        ${convertData(project.aPlanBudget)},
        ${convertData(project.aFactStartDate)},
        ${convertData(project.aFactEndDate)},
        ${convertData(project.aFactBudget)},
        ${project.dProjectStateID}
      ) RETURNING id "created_project_id";
      `;
    },
    UPDATE_PROJECT(project) {
      return `
      UPDATE projects.e_project
      SET
        d_project_kind_id = ${convertData(project.dProjectKindID)},
        e_customer_id = ${convertData(project.eCustomerID)},
        a_project_name = '${project.aProjectName}',
        a_project_desc = ${convertData(project.aProjectDesc)},
        e_contract_id = ${convertData(project.eContractID)},
        e_project_manager_id = ${convertData(project.eProjectManagerID)},
        e_project_plan_id = ${convertData(project.eProjectPlanID)},
        e_project_team_id = ${convertData(project.eProjectTeamID)},
        a_official_project_name = ${convertData(project.aOfficialProjectName)},
        a_plan_start_date = ${convertData(project.aPlanStartDate)},
        a_plan_end_date = ${convertData(project.aPlanStartDate)},
        a_plan_budget = ${convertData(project.aPlanBudget)},
        a_fact_start_date = ${convertData(project.aFactStartDate)},
        a_fact_end_date = ${convertData(project.aFactEndDate)},
        a_fact_budget = ${convertData(project.aFactBudget)},
        d_project_state_id = ${project.dProjectStateID}
      WHERE id = ${project.id}
      RETURNING id "updated_project_id";
      `
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) data = 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}