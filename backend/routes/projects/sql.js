'use strict';

const Queries = {
  projects: {
    SELECT_ALL_PROJECTS: function () {
      return `
      SELECT
        *
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
          v_a_project_description := '${project.projectDescription}',
          v_e_user_id := ${user.id}
        );
      `;
    }
  }
}

module.exports = Queries;
