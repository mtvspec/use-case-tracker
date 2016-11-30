const Queries = {
  organizations: {
    SELECT_ALL_ORGANIZATIONS() {
      return `
      SELECT
        id,
        a_organization_bin "aOrganizationBin",
        a_organization_short_name "aOrganizationShortName",
        a_organization_official_name "aOrganizationOfficialName",
        is_deleted "isDeleted"
      FROM
        organizations.e_organization
      ORDER BY
        id
      ASC;
      `;
    },
    SELECT_ORGANIZATION_BY_ID(organization, user) {
      return `
      SELECT
        id,
        bin,
        short_name "shortName",
        official_name "officialName",
        is_deleted "isDeleted"
      FROM
        organizations.select_organization (
          ${organization.id},
          ${user.id}
        );`;
    },
    SELECT_ORGANIZATION_BY_BIN(bin) {
      return `
      SELECT
        id
      FROM
        organizations.e_organization
      WHERE
        a_organization_bin = '${bin}';`;
    },
    INSERT_ORGANIZATION(organization, session, user) {
      return `
      SELECT
        organizations.create_organization (
          v_a_organization_bin := '${organization.aOrganizationBin}',
          v_a_organization_short_name := '${organization.aOrganizationShortName}',
          v_a_organization_official_name := '${organization.aOrganizationOfficialName}',
          v_e_session_id := ${session.id},
          v_e_user_id := ${user.id}
        );
      `;
    },
    UPDATE_ORGANIZATION(organization, user) {
      return `
      SELECT
        organizations.update_organization (
          ${organization.id},
          '${organization.bin}',
          '${organization.shortName}',
          '${organization.officialName}',
          ${user.id}
        );`;
    },
    DELETE_ORGANIZATION(organization, user) {
      return `
      SELECT
        organizations.delete_organization (
          ${organization.id},
          ${user.id}
        );`;
    },
    RESTORE_ORGANIZATION(organization, user) {
      return `
      SELECT
        organizations.restore_organization (
          ${organization.id},
          ${user.id}
        );`;
    }
  }
}

module.exports = Queries;
