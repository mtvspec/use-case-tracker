import { Utils } from './../../common';
export const OrganizationsQueries = {
  organizations: {
    selectAllOrganizations () {
      return `
      SELECT
        *
      FROM organizations.e_organization
      ORDER BY id ASC;
      `;
    },
    selectOrganization (id: number) {
      return `
      SELECT
        *
      FROM organizations.e_organization
      WHERE id = ${id};
      `;
    },
    INSERT_ORGANIZATION: (organization) => {
      return `
      INSERT INTO organizations.e_organization (
        "aOrganizationBin",
        "aOrganizationShortName",
        "aOrganizationOfficialName"
      ) VALUES (
        ${Utils.convertData(organization.aOrganizationBin)},
        '${organization.aOrganizationShortName}',
        ${Utils.convertData(organization.aOrganizationOfficialName)}
      ) RETURNING id;
      `;
    }
  }
}
