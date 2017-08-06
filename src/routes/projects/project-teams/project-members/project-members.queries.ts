export const ProjectMembersQueries = {
  selectAllProjectMembers (id) {
    return `
    SELECT
      pm.id,
      coalesce(p."lastName" ||' ', '')||p."firstName"||coalesce(' '||p."middleName", '') "aProjectMember",
      pm."createdAt",
      pm."updatedAt"
    FROM
      projects.e_project_member pm,
      persons.e_person p
    WHERE pm."eProjectTeamID" = ${id}
    AND pm."ePersonID" = p.id
    ORDER BY pm.id ASC;
    `;
  },
  selectProjectMember (id) {
    return `
    SELECT
      pm.id,
      p."iin",
      p."lastName",
      p."firstName",
      p."middleName",
      p."dob",
      p."genderID",
      pm."createdAt",
      pm."updatedAt"
    FROM
      projects.e_project_member pm,
      persons.e_person p
    WHERE pm.id = ${id}
    AND pm."ePersonID" = p.id
    ORDER BY pm.id ASC;
    `;
  }
}
