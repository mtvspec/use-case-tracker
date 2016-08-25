const Queries = {
  organizations: {
    SELECT_ALL_ORGANIZATIONS() {
      return `
      SELECT
        *
      FROM
        organizations.e_organization
      ORDER BY
        id ASC;`
    },
    SELECT_ORGANIZATION_BY_BIN(bin) {
      return `
      SELECT
        id
      FROM
        organizations.e_organization
      WHERE
        bin = '${bin}';`
    },
    INSERT_ORGANIZATION(organization, user) {
      console.log(organization);
      return `
      SELECT
        organizations.create_organization (
          '${organization.bin}',
          '${organization.shortName}',
          '${organization.officialName}',
          ${user.id}
        );`
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
        );`
    }
  }
}

module.exports = Queries;
