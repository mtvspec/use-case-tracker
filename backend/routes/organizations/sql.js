const Queries = {
  organizations: {
    SELECT_ALL_ORGANIZATIONS() {
      return `
      SELECT
        o.*
      FROM
        organizations.e_organization_view o;
      `;
    },
    SELECT_ORGANIZATION_BY_ID(organization) {
      return `
      SELECT
        o.*
      FROM
        organizations.e_organization_view o
      WHERE o.id = ${organization.id};
      `;
    },
    SELECT_ORGANIZATION_BY_BIN(organization) {
      return `
      SELECT
        id
      FROM
        organizations.e_organization
      WHERE
        a_organization_bin = '${oranization.aOrganizationBin}';`;
    },
    INSERT_ORGANIZATION(organization) {
      return `
      INSERT INTO organizations.e_organization (
        a_organization_bin,
        a_organization_short_name,
        a_organization_official_name
      ) VALUES (
        ${convertData(organization.aOrganizationBin)},
        '${organization.aOrganizationShortName}',
        ${convertData(organization.aOrganizationOfficialName)}
      ) RETURNING
          id,
          a_organization_bin "aOrganizationBin",
          a_organization_short_name "aOrganizationShortName",
          a_organization_official_name "aOrganizationOfficialName",
          is_deleted "isDeleted";
      `;
    },
    UPDATE_ORGANIZATION(organization) {
      return `
      UPDATE organizations.e_organization
      SET
        a_organization_bin = ${convertData(organization.aOrganizationBin)},
        a_organization_short_name = '${organization.aOrganizationShortName}',
        a_organization_official_name = ${convertData(organization.aOrganizationOfficialName)}
      WHERE id = ${organization.id}
      RETURNING
        id,
        a_organization_bin "aOrganizationBin",
        a_organization_short_name "aOrganizationShortName",
        a_organization_official_name "aOrganizationOfficialName",
        is_deleted "isDeleted";
      `;
    },
    DELETE_ORGANIZATION(organization) {
      return `
      UPDATE organizations.e_organization
      SET
        is_deleted = true
      WHERE id = ${organization.id}
      RETURNING
        id,
        a_organization_bin "aOrganizationBin",
        a_organization_short_name "aOrganizationShortName",
        a_organization_official_name "aOrganizationOfficialName",
        is_deleted "isDeleted";
      `;
    },
    RESTORE_ORGANIZATION(organization) {
      return `
      UPDATE organizations.e_organization
      SET
        is_deleted = false
      WHERE id = ${organization.id}
      RETURNING
        id,
        a_organization_bin "aOrganizationBin",
        a_organization_short_name "aOrganizationShortName",
        a_organization_official_name "aOrganizationOfficialName",
        is_deleted "isDeleted";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = 'null';
  else return `${data ? "'" + data + "'" : 'null'}`;
}