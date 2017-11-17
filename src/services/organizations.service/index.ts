import {
  DatabaseService, QueryConfig
} from './../database.service'
const ORGANIZATIONS_TABLE: string = 'organizations.e_organization'
const ORGANIZATIONAL_UNITS_TABLE: string = 'organizations.e_organizational_unit'
const POSITIONAL_UNITS_TABLE: string = 'organizations.e_positional_unit'
const EMPLOYEES_TABLE: string = 'organizations.e_emp'

let organizationTableFields: string[] = []
let organizationalUnitsTableFields: string[] = []
let positionalUnitsTableFields: string[] = []
let employeesTableFields: string[] = []

export class OrganizationsService extends DatabaseService {
  public static getOrganizations (
    unfilteredFields: string[],
    args: any
  ) {
    return this.getNodes(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      unfilteredFields,
      (args && args.length) > 0 ? args : null
    )
  }
  public static async getOrganizationsCount (
    source?: number | string,
    args?: any
  ) {
    return this.getNodesCount(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      source ? source : null,
      (args && args.length) > 0 ? args : null
    )
  }
  public static async getOrganization (
    unfilteredFields: string[],
    id: number
  ) {
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
  public static async getOrganizationalUnits (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      organizationalUnitsTableFields,
      fields), 'ou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
        
        SELECT
          ${requestedFields}
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
  public static async getSubordinades (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      employeesTableFields,
      fields), 's')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${EMPLOYEES_TABLE} s,
          ${EMPLOYEES_TABLE} m
        WHERE s."manager" = m.id
        AND m.id = ${id};

      `
    }))
  }
  public static async getManagersByOrganizationalUnit (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      employeesTableFields,
      fields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${EMPLOYEES_TABLE} e,
        ${ORGANIZATIONAL_UNITS_TABLE} ou
      WHERE ou."managerID" = e.id
      AND ou.id = ${id}
      
      `
    }))
  }
  public static async getSubordinadedOrganizationalUnitsByEmployee (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      organizationalUnitsTableFields,
      fields), 'ou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${ORGANIZATIONAL_UNITS_TABLE} ou,
        ${EMPLOYEES_TABLE} e
      WHERE ou.curator = e.id
      AND e.id = ${id}
      
      `
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
  public static async getChildOrganizationalUnitsByOrganizationalUnit (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      organizationalUnitsTableFields,
      fields), 'cou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${ORGANIZATIONAL_UNITS_TABLE} cou,
        ${ORGANIZATIONAL_UNITS_TABLE} pou
      WHERE cou."organizationalUnit" = pou.id
      AND pou.id = ${id}
      ORDER BY cou.idx;
      
      `
    }))
  }
  public static async getEmployeesByOrganizationalUnit (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      employeesTableFields,
      fields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${EMPLOYEES_TABLE} e,
        ${ORGANIZATIONAL_UNITS_TABLE} ou
      WHERE e."organizationalUnit" = ou.id
      --AND ou."manager" != e.id
      AND e."firedAt" IS NULL
      AND ou.id = ${id}
      ORDER BY ou.idx;
      
      `
    }))
  }
  public static async getAllEmployeesByOrganizationalUnit (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      employeesTableFields,
      fields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
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
      );
      
      `
    }))
  }
  public static async getSubordinadedOrganizationalUnitsByOrganizationalUnit (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      organizationalUnitsTableFields,
      fields), 'ou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT  
        ${requestedFields}
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
      );
      
      `
    }))
  }
  public static async getSubordinadedOrganizationalUnitsManagersByOrganizationalUnit (fields: string[], id: number) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      employeesTableFields,
      fields), 'm')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT  
        ${requestedFields}
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
      );
      
      `
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

(async function getOrganizationTableFields () {
  const response: any = await <any>OrganizationsService.fields(ORGANIZATIONS_TABLE)
  if (response && response.length > 0) organizationTableFields = response
  else console.trace(response)
})();

(async function getOrganizationalUnitTableFields () {
  const response: any = await <any>OrganizationsService.fields(ORGANIZATIONAL_UNITS_TABLE)
  if (response && response.length > 0) organizationalUnitsTableFields = response
  else console.trace(response)
})();

(async function getPositionalUnitTableFields () {
  const response: any = await <any>OrganizationsService.fields(POSITIONAL_UNITS_TABLE)
  if (response && response.length > 0) positionalUnitsTableFields = response
  else console.trace(response)
})();

(async function getEmployeesTableFields () {
  const response: any = await <any>OrganizationsService.fields(EMPLOYEES_TABLE)
  if (response && response.length > 0) employeesTableFields = response
  else console.trace(response)
})();