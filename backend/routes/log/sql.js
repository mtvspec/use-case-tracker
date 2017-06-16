'use strict';

const Queries = {
  persons: {
    INSERT_RECORD(operationID, person) {
      return `
      INSERT INTO log.e_person_log (
          e_operation_id,
          e_person_id,
          a_person_iin,
          a_person_last_name,
          a_person_first_name,
          a_person_middle_name,
          a_person_dob,
          d_person_gender_id,
          is_deleted
      ) VALUES (
        ${operationID},
        ${person.id},
        ${convertData(person.aPersonIIN)},
        ${convertData(person.aPersonLastName)},
        ${convertData(person.aPersonFirstName)},
        ${convertData(person.aPersonMiddleName)},
        ${convertData(person.aPersonDOB)},
        ${convertData(person.dPersonGenderID)},
        ${convertData(person.isDeleted)}
      ) RETURNING id;
      `;
    }
  },
  projects: {
    INSERT_RECORD(operationID, project) {
      return `
      INSERT INTO log.e_project_log (
        e_operation_id,
        e_project_id,
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
        ${operationID},
        ${project.id},
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
      ) RETURNING id;
      `;
    }    
  },
  organizations: {
    INSERT_RECORD(operationID, organization) {
      return `
      INSERT INTO log.e_organization_log (
        e_operation_id,
        e_organization_id,
        a_organization_bin,
        a_organization_short_name,
        a_organization_official_name,
        is_deleted
      ) VALUES (
        ${operationID},
        ${organization.id},
        ${convertData(organization.aOrganizationBin)},
        '${organization.aOrganizationShortName}',
        ${convertData(organization.aOrganizationOfficialName)},
        ${organization.isDeleted}
      ) RETURNING id;
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = 'null';
  else return `${data ? "'" + data + "'" : 'null'}`;
}