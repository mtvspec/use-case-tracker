import { convertData } from './../../utils'
export default {
  issues: {
    GET_ISSUES_COUNT: () => {
      return `
      SELECT
        count(i.id) "totalCount"
      FROM
        issues.e_issue i;`
    },
    GET_ISSUES: () => {
      return `
      SELECT
        i.*
      FROM
        issues.e_issue i
      ORDER BY i.id ASC;`
    },
    FILTER_ISSUES: (filter) => {
      return `
      SELECT
        i.*
      FROM
        issues.e_issue i
      WHERE i."${filter.field}" = ${filter.value}
      ORDER BY i.id ASC;`
    },
    GET_ISSUES_BY_COLUMN_NAME: (data: { field: string, value: string }) => {
      return `
      SELECT
        i.*
      FROM
        issues.e_issue i
      WHERE lower(i."${data.field}") LIKE lower('%${data.value}%')
      ORDER BY i.id ASC;`
    },
    GET_ISSUE: (id: number) => {
      return `
      SELECT
        i.*
      FROM
        issues.e_issue i
      WHERE i.id = ${id};`
    },
    INSERT_ISSUE: (data: any) => {
      return `
      INSERT INTO issues.e_issue (
        "authorID",
        "typeID",
        "title",
        "description",
        "createdBy",
        "modifiedBy"
      ) VALUES (
        ${convertData(data.authorID)},
        ${convertData(data.typeID)},
        '${data.title}',
        ${convertData(data.description)},
        ${data.user.id},
        ${data.user.id}
      ) RETURNING *;`
    },
    UPDATE_ISSUE: (data: any) => {
      return `
      UPDATE issues.e_issue
      SET
        "authorID" = ${convertData(data.authorID)},
        "typeID" = ${convertData(data.typeID)},
        "title" = '${data.title}',
        "description" = ${convertData(data.description)},
        "updatedBy" = ${data.user.id},
        "updatedAt" = 'now()',
        "modifiedBy" = ${data.user.id}
      WHERE id = ${data.id}
      RETURNING *;`
    },
    DELETE_ISSUE: (data: any) => {
      return `
      UPDATE issues.e_issue
      SET
        "isDeleted" = true,
        "deletedBy" = ${data.user.id},
        "deletedAt" = 'now()',
        "modifiedBy" = ${data.user.id}
      WHERE id = ${data.id}
      RETURNING *;`
    },
    OPEN_ISSUE: (data: any) => {
      return `
      UPDATE issues.e_issue
      SET
        "stateID" = 136,
        "openedBy" = ${data.user.id},
        "openedAt" = 'now()',
        "modifiedBy" = ${data.user.id}
      WHERE id = ${data.id}
      RETURNING *;`
    },
    CLOSE_ISSUE: (data: any) => {
      return `
      UPDATE issues.e_issue
      SET
        "stateID" = 163,
        "openedBy" = ${data.user.id},
        "openedAt" = 'now()',
        "modifiedBy" = ${data.user.id}
      WHERE id = ${data.id}
      RETURNING *;`
    }
  }
}