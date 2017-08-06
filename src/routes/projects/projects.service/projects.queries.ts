export const ProjectsQueries = {
  projects: {
    selectAllProjects: `
    SELECT
      p.id,
      c."aCustomerName" ||' - '|| c."aCustomerDesc" "aProjectCustomer",
      p."aProjectName",
      p."aProjectDesc",
      p."aOfficialProjectName",
      p."aPlanStartDate",
      p."aPlanEndDate",
      p."aPlanBudget",
      p."aFactStartDate",
      p."aFactEndDate",
      p."aFactBudget",
      pm."lastName" ||' '|| pm."firstName" ||' '|| pm."middleName" "aProjectCurator",
      cr."lastName" ||' '|| cr."firstName" ||' '|| cr."middleName" "aProjectManager"
    FROM
      projects.e_project p
    LEFT JOIN customers.e_customer c ON p."eCustomerID" = c.id
    LEFT JOIN emp.e_emp epm ON p."eProjectManagerID" = epm.id
    LEFT JOIN persons.e_person pm ON epm."ePersonID" = pm.id
    LEFT JOIN emp.e_emp ecr ON p."eProjectCuratorID" = ecr.id
    LEFT JOIN persons.e_person cr ON ecr."ePersonID" = cr.id
    ORDER BY p.id;
    `
  }
}
