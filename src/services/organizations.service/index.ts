import queries from './queries'
import {
  DatabaseService, QueryConfig
} from './../database.service'
const ORGANIZATIONS_TABLE: string = 'organizations.e_organization'
const ORGANIZATIONAL_UNITS_TABLE: string = 'organizations.e_organizational_unit'
const EMPLOYEES_TABLE: string = 'organizations.e_emp'
const POSITIONAL_UNITS_TABLE: string = 'organizations.e_positional_unit'

let organizationTableFields: string[] = []
let organizationalUnitsTableFields: string[] = []
let positionalUnitsTableFields: string[] = []
let employeesTableFields: string[] = []

export class OrganizationsService extends DatabaseService {
  public static getOrganizations (unfilteredFields: string[]) {
    return this.getNodes(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      unfilteredFields
    )
  }
  public static async getOrganizationsCount () {
    return this.getNodesCount(
      ORGANIZATIONS_TABLE
    )
  }
  public static async getOrganization (unfilteredFields: string[], id: number) {
    return this.getNode(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      unfilteredFields,
      id
    )
  }
  public static createOrganization (data: any, user: number) {
    return this.createNode(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      data,
      user
    )
  }
  public static updateOrganization (data: any, user: number) {
    return this.updateNode(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      data,
      user
    )
  }
  public static deleteOrganization (id: number, user: number) {
    return this.deleteNode(
      ORGANIZATIONS_TABLE,
      id,
      user
    )
  }
  public static async getOrganizationalUnits (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
        
        SELECT
          ou.*
        FROM
          ${ORGANIZATIONAL_UNITS_TABLE} ou,
          ${ORGANIZATIONS_TABLE} o
        WHERE ou."organization" = o.id
        AND o.id = ${id}
        ORDER BY idx ASC;

      `
    }))
  }
  public static async getOrganizationalUnit (unfilteredFields: string[], id: number) {
    return this.getNode(
      ORGANIZATIONAL_UNITS_TABLE,
      organizationalUnitsTableFields,
      unfilteredFields,
      id
    )
  }
  public static async createOrganizationalUnit (data: any, user: number) {
    return this.createNode(
      ORGANIZATIONAL_UNITS_TABLE,
      organizationalUnitsTableFields,
      data,
      user
    )
  }
  public static updateOrganizationalUnit (data: any, user: number) {
    return this.updateNode(
      ORGANIZATIONAL_UNITS_TABLE,
      organizationalUnitsTableFields,
      data,
      user
    )
  }
  public static deleteOrganizationalUnit (id: number, user: number) {
    return this.deleteNode(
      ORGANIZATIONAL_UNITS_TABLE,
      id,
      user
    )
  }
  public static async getSubordinades (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
        SELECT
          s.*
        FROM
          ${EMPLOYEES_TABLE} s,
          ${EMPLOYEES_TABLE} m
        WHERE s."manager" = m.id
        AND m.id = ${id};
      `
    }))
  }
  public static async getManagersByOrganizationalUnit (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.organizations.GET_ORGANIZATIONAL_UNIT_MANAGERS_BY_ORGANIZATIONAL_UNIT_ID(organizationalUnitID)
    }))
  }
  public static async getManager (unfilteredFields: string[], id: number) {
    return this.getNode(
      EMPLOYEES_TABLE,
      employeesTableFields,
      unfilteredFields,
      id
    )
  }
  public static async getChildOrganizationalUnitsByOrganizationalUnit (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        cou.*
      FROM
        ${ORGANIZATIONAL_UNITS_TABLE} cou,
        ${ORGANIZATIONAL_UNITS_TABLE} pou
      WHERE cou."organizationalUnit" = pou.id
      AND pou.id = ${id}
      ORDER BY cou.id;`
    }))
  }
  public static async getEmployeesByOrganizationalUnit (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        e.*
      FROM
        ${ORGANIZATIONAL_UNITS_TABLE} ou,
        ${EMPLOYEES_TABLE} e
      WHERE e."organizationalUnit" = ou.id
      --AND ou."manager" != e.id
      AND e."firedAt" IS NULL
      AND ou.id = ${id}
      ORDER BY ou.id;`
    }))
  }
  public static async getAllEmployeesByOrganizationalUnit (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        e.*
      FROM
        ${EMPLOYEES_TABLE} e,
        persons.e_person p
      WHERE e."person" = p.id
      AND e."organizationalUnit" in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          ${ORGANIZATIONAL_UNITS_TABLE}
        WHERE id = ${id}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN ${ORGANIZATIONAL_UNITS_TABLE} cou ON cou."organizationalUnit" = pou.id
      )
      SELECT
        id
      FROM
        cte
      ORDER BY level
      );`
    }))
  }
  public static async getSubordinadedOrganizationalUnitsByOrganizationalUnit (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT  
        ou.*
      FROM
        ${ORGANIZATIONAL_UNITS_TABLE} ou
      WHERE ou.id in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          ${ORGANIZATIONAL_UNITS_TABLE}
        WHERE "organizationalUnit" = ${id}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN ${ORGANIZATIONAL_UNITS_TABLE} cou ON cou."organizationalUnit" = pou.id
      )
      SELECT
        id
      FROM
        cte
      ORDER BY level
      );`
    }))
  }
  public static async getSubordinadedOrganizationalUnitsManagersByOrganizationalUnit (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT  
        m.*
      FROM
        ${EMPLOYEES_TABLE} m,
        ${ORGANIZATIONAL_UNITS_TABLE} ou
      WHERE ou."manager" = m.id
      AND ou.id in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          ${ORGANIZATIONAL_UNITS_TABLE}
        WHERE "organizationalUnit" = ${id}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN ${ORGANIZATIONAL_UNITS_TABLE} cou ON cou."organizationalUnit" = pou.id
      )
      SELECT
        id
      FROM
        cte
      ORDER BY level
      );`
    }))
  }
  public static async getPositionalUnit (unfilteredFields: string[], id: number, args?: any) {
    return this.getNode(
      POSITIONAL_UNITS_TABLE,
      positionalUnitsTableFields,
      unfilteredFields,
      id,
      args
    )
  }
}

const getOrganizationTableFields = (async () => {
  const response: any = await <any>OrganizationsService.fields(ORGANIZATIONS_TABLE)
  if (response && response.length > 0) organizationTableFields = response
  else console.trace(response)
})()

const getOrganizationalUnitTableFields = (async () => {
  const response: any = await <any>OrganizationsService.fields(ORGANIZATIONAL_UNITS_TABLE)
  if (response && response.length > 0) organizationalUnitsTableFields = response
  else console.trace(response)
})()

const getPositionalUnitTableFields = (async () => {
  const response: any = await <any>OrganizationsService.fields(POSITIONAL_UNITS_TABLE)
  if (response && response.length > 0) {
    positionalUnitsTableFields = response
  }
  else console.trace(response)
})()