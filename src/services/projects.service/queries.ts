import { convertData } from './../../utils';

export default {
  projects: {
    GET_PROJECT_BY_PROJECT_NAME (projectName: string) {
      return `
      
        SELECT
          id
        FROM
          projects.e_project
        WHERE "projectName" = '${projectName}'
      
      `
    },
    INSERT_PROJECT: (data: any) => {
      return `
      INSERT INTO projects.e_project (
        "projectName",
        "projectDescription",
        "officialProjectName",
        "planStartDate",
        "planEndDate",
        "planBudget",
        "factStartDate",
        "factEndDate",
        "factBudget",
        "createdBy",
        "modifiedBy"
      ) VALUES (
        '${data.projectName}',
        ${convertData(data.projectDescription)},
        ${convertData(data.officialProjectName)},
        ${convertData(data.planStartDate)},
        ${convertData(data.planEndDate)},
        ${convertData(data.planBudget)},
        ${convertData(data.factStartDate)},
        ${convertData(data.factEndDate)},
        ${convertData(data.factBudget)},
        ${data.user.id},
        ${data.user.id}
      ) RETURNING *;`
    }
  }
}