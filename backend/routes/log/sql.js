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
        ${person.isDeleted}
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
        a_official_project_name,
        a_plan_start_date,
        a_plan_end_date,
        a_plan_budget,
        a_fact_start_date,
        a_fact_end_date,
        a_fact_budget,
        d_project_state_id,
        is_deleted
      ) VALUES (
        ${operationID},
        ${project.id},
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
        ${project.dProjectStateID},
        ${project.isDeleted}
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
  },
  issues: {
    INSERT_RECORD(operationID, issue) {
      return `
      INSERT INTO log.e_issue_log (
        e_operation_id,
        e_issue_id,
        e_issue_author_id,
        d_issue_type_id,
        a_issue_name,
        a_issue_desc,
        d_issue_state_id,
        is_deleted
      ) VALUES (
        ${operationID},
        ${issue.id},
        ${issue.eIssueAuthorID},
        ${issue.dIssueTypeID},
        '${issue.aIssueName}',
        ${convertData(issue.aIssueDesc)},
        ${issue.dIssueStateID},
        ${issue.isDeleted}
      ) RETURNING id;
      `;
    }
  },
  projectTeams: {
    INSERT_RECORD(operationID, projectTeam) {
      return `
      INSERT INTO log.e_project_team_log (
        e_operation_id,
        e_project_team_id,
        a_project_team_name,
        a_project_team_desc,
        is_deleted
      ) VALUES (
        ${operationID},
        ${projectTeam.id},
        '${projectTeam.aProjectTeamName}',
        ${convertData(projectTeam.aProjectTeamDesc)},
        ${projectTeam.isDeleted}
      ) RETURNING id;
      `;
    }
  },
  projectMembers: {
    INSERT_RECORD(operationID, projectMember) {
      return `
      INSERT INTO log.e_project_member_log (
        e_operation_id,
        e_project_member_id,
        e_project_team_id,
        e_person_id,
        d_project_member_state_id,
        is_deleted
      ) VALUES (
        ${operationID},
        ${projectMember.id},
        ${projectMember.eProjectTeamID},
        ${projectMember.ePersonID},
        ${projectMember.dProjectMemberStateID},
        ${projectMember.isDeleted}
      ) RETURNING id;
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = null;
  else return `${data ? "'" + data + "'" : 'null'}`;
}