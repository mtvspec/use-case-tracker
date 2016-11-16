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
      console.log(project);
      return `
      SELECT
        projects.create_project (
          '${project.projectKindID}',
          '${project.customerID}',
          '${project.formalName}',
          '${project.workName}',
          '${project.officialName}',
          '${project.description}',
          '${project.planStartDate}',
          '${project.planEndDate}',
          '${project.planBudget}',
          '${project.factStartDate}',
          '${project.factEndDate}',
          '${project.factBudget}',
          '${project.projectManagerID}',
          '${user.id}'
        );
      `;
    }
  }
}

module.exports = Queries;
