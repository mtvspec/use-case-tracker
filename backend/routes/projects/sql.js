'use strict';

const Queries = {
  projects: {
    SELECT_ALL_PROJECTS() {
      return `
      SELECT
        p.id,
        k.a_dict_value_name_en "aProjectKindNameEN",
        o.id "eOrganizationID",
        o."aOrganizationShortName",
        c."aCustomerName",
        p.a_project_name "aProjectName",
        p.a_project_desc "aProjectDesc",
        pc.a_document_name "aContractName",
        m."aPersonFirstName"||' '||m."aPersonLastName" "aProjectManagerFirstNameLastName",
        pp.a_document_name "aProjectPlanName",
        p.a_official_project_name "aOfficialProjectName",
        p.a_plan_start_date "aPlanStartDate",
        p.a_plan_end_date "aPlanEndDate",
        p.a_plan_budget "aPlanBudget",
        p.a_fact_start_date "aFactStartDate",
        p.a_fact_end_date "aFactEndDate",
        p.a_fact_budget "aFactBudget",
        s.a_dict_value_name_en "aProjectStateNameEN",
        p.is_deleted "isDeleted"
      FROM
        projects.e_project p
      LEFT JOIN emp.e_emp e ON p.e_project_manager_id = e.id
      LEFT JOIN persons.e_person m ON e.e_person_id = m.id
      LEFT JOIN documents.e_document pc ON p.e_contract_id = pc.id
      LEFT JOIN documents.e_document pp ON p.e_project_plan_id = pp.id
      LEFT JOIN customers.e_customer c ON p.e_customer_id = c.id
      LEFT JOIN organizations.e_organization o ON c."eOrganizationID" = o.id
      LEFT JOIN dict.e_dict_value k ON p.d_project_kind_id = k.id
      LEFT JOIN dict.e_dict_value s ON p.d_project_state_id = s.id;
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
        ${convertData(project.aProjectDesc)},
        ${convertData(project.eContractID)},
        ${convertData(project.eProjectManagerID)},
        ${convertData(project.eProjectPlanID)},
        ${convertData(project.aOfficialProjectName)},
        ${convertData(project.aPlanStartDate)},
        ${convertData(project.aPlanEndDate)},
        ${convertData(project.aPlanBudget)},
        ${convertData(project.aFactStartDate)},
        ${convertData(project.aFactEndDate)},
        ${convertData(project.aFactBudget)},
        ${project.dProjectStateID}
      ) RETURNING
        id,
        d_project_kind_id "dProjectKindID",
        e_customer_id "eCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "eContractID",
        e_project_manager_id "eProjectManagerID",
        e_project_plan_id "eProjectPlanID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "dProjectStateID",
        is_deleted "isDeleted";
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
        a_official_project_name = ${convertData(project.aOfficialProjectName)},
        a_plan_start_date = ${convertData(project.aPlanStartDate)},
        a_plan_end_date = ${convertData(project.aPlanEndDate)},
        a_plan_budget = ${convertData(project.aPlanBudget)},
        a_fact_start_date = ${convertData(project.aFactStartDate)},
        a_fact_end_date = ${convertData(project.aFactEndDate)},
        a_fact_budget = ${convertData(project.aFactBudget)},
        d_project_state_id = ${project.dProjectStateID}
      WHERE id = ${project.id}
      RETURNING
        id,
        d_project_kind_id "dProjectKindID",
        e_customer_id "eCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "eContractID",
        e_project_manager_id "eProjectManagerID",
        e_project_plan_id "eProjectPlanID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "dProjectStateID",
        is_deleted "isDeleted";
      `;
    },
    DELETE_PROJECT(project) {
      return `
      UPDATE projects.e_project
      SET
        is_deleted = true
      WHERE id = ${project.id}
      RETURNING
        id,
        d_project_kind_id "dProjectKindID",
        e_customer_id "eCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "eContractID",
        e_project_manager_id "eProjectManagerID",
        e_project_plan_id "eProjectPlanID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "dProjectStateID",
        is_deleted "isDeleted";
      `;
    },
    RESTORE_PROJECT(project) {
      return `
      UPDATE projects.e_project
      SET
        is_deleted = false
      WHERE id = ${project.id}
      RETURNING
        id,
        d_project_kind_id "dProjectKindID",
        e_customer_id "eCustomerID",
        a_project_name "aProjectName",
        a_project_desc "aProjectDesc",
        e_contract_id "eContractID",
        e_project_manager_id "eProjectManagerID",
        e_project_plan_id "eProjectPlanID",
        a_official_project_name "aOfficialProjectName",
        a_plan_start_date "aPlanStartDate",
        a_plan_end_date "aPlanEndDate",
        a_plan_budget "aPlanBudget",
        a_fact_start_date "aFactStartDate",
        a_fact_end_date "aFactEndDate",
        a_fact_budget "aFactBudget",
        d_project_state_id "dProjectStateID",
        is_deleted "isDeleted";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = null;
  return `${data ? "'" + data + "'" : 'null'}`;
}