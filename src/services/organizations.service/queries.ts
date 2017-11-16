import { convertData } from './../../utils';
export default {
  organizations: {
    GET_ORGANIZATION_BY_ID: (organizationID: number) => {
      return `
      SELECT
        *
      FROM
        organizations.e_organization
      WHERE id = ${organizationID};`
    },
    GET_ORGANIZATIONS: () => {
      return `
      SELECT
        o.*
      FROM
        organizations.e_organization o
      ORDER BY o.id;`
    },
    GET_ORGANIZATIONAL_UNIT_MANAGERS_BY_ORGANIZATIONAL_UNIT_ID: (organizationalUnitID: number) => {
      return `
      SELECT
        e.*
      FROM
        organizations.e_emp e,
        organizations.e_organizational_unit ou
      WHERE ou."managerID" = e.id
      AND ou.id = ${organizationalUnitID}
      `
    },
    GET_ORGANIZATIONAL_UNIT_BY_ORGANIZATION_ID: (organizationalUnitID: number) => {
      return `
      SELECT
        ou.*
      FROM
        organizations.e_organizational_unit ou
      WHERE ou.id = ${organizationalUnitID};`
    },
    GET_ORGANIZATIONS_COUNT: () => {
      return `
      SELECT
        count(o.id) "totalCount"
      FROM
        organizations.e_organization o;`
    },
    GET_MANAGER_BY_ID: (employeeID: number) => {
      return `
      SELECT
        e.*
      FROM
        organizations.e_emp e
      WHERE e.id = ${employeeID};`
    },
    GET_MANAGERS_BY_ORGANIZATIONAL_UNIT_ID: (organizationalUnitID: number) => {
      return `
      SELECT
        e.*
      FROM
        organizations.e_organizational_unit ou,
        organizations.e_emp e
      WHERE e."subordinadeOrganizationalUnitID" = ou.id
      AND ou.id = ${organizationalUnitID};`
    },
    INSERT_ORGANIZATION: (data) => {
      return `
      INSERT INTO organizations.e_organization (
        bin,
        name,
        "officialName",
        "createdBy",
        "modifiedBy"
      ) VALUES (
        ${convertData(data.bin)},
        '${data.name}',
        ${convertData(data.officialName)},
        ${data.user.id},
        ${data.user.id}
      ) RETURNING *;`
    },
    UPDATE_ORGANIZATION: (data) => {
      return `
      UPDATE organizations.e_organization
      SET
        bin = ${convertData(data.bin)},
        name = '${data.name}',
        "officialName" = ${convertData(data.officialName)},
        "updatedBy" = ${data.user.id},
        "updatedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING *;`
    },
    DELETE_ORGANIZATION: (data) => {
      return `
      UPDATE organizations.e_organization
      SET
        "isDeleted" = true,
        "deletedBy" = ${data.user.id},
        "deletedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING *;`
    },
  }
}