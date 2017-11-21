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
    args?,
    except?: { [key: string]: any },
    orderBy?: string[]
  ) {
    return this.getNodes({
      table: ORGANIZATIONS_TABLE,
      tableFields: organizationTableFields,
      unfilteredFields,
      args,
      except,
      orderBy
    })
  }
  public static async getOrganizationsCount (args?) {
    return this.getNodesCount({
      table: ORGANIZATIONS_TABLE,
      tableFields: organizationTableFields,
      args
    })
  }
  public static async getOrganization (
    unfilteredFields: string[],
    args
  ) {
    return this.getNode({
      table: ORGANIZATIONS_TABLE,
      tableFields: organizationTableFields,
      unfilteredFields,
      args
    })
  }
  public static createOrganization (data: any, user: number) {
    return this.createNode({
      table: ORGANIZATIONS_TABLE,
      tableFields: organizationTableFields,
      data,
      user
    })
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
  public static async getOrganizationalUnits (fields: string[], id) {
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
        AND o.id = ${id['id']}
        ORDER BY ou.idx ASC, ou."createdAt";

      `
    }))
  }
  public static async getOrganizationalUnit (unfilteredFields: string[], args) {
    return this.getNode({
      table: ORGANIZATIONAL_UNITS_TABLE,
      tableFields: organizationalUnitsTableFields,
      unfilteredFields,
      args
    })
  }
  public static async createOrganizationalUnit (data, user: number) {
    return this.createNode({
      table: ORGANIZATIONAL_UNITS_TABLE,
      tableFields: organizationalUnitsTableFields,
      data,
      user
    })
  }
  public static updateOrganizationalUnit (data, user: number) {
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
  public static async getSubordinades (fields: string[], id) {
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
        AND m.id = ${id['id']}
        ORDER BY s.idx ASC, s."createdAt";

      `
    }))
  }
  public static async getManagersByOrganizationalUnit (fields: string[], id) {
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
      AND ou.id = ${id['id']}
      ORDER BY e.idx, e."createdAt";
      
      `
    }))
  }
  public static async getSubordinatedOrganizationalUnitsByEmployee (fields: string[], id) {
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
      AND e.id = ${id['id']}
      ORDER BY ou.idx ASC, ou."createdAt";
      
      `
    }))
  }
  public static async getManager (unfilteredFields: string[], args) {
    return this.getNode({
      table: EMPLOYEES_TABLE,
      tableFields: employeesTableFields,
      unfilteredFields,
      args
    })
  }
  public static async getChildOrganizationalUnitsByOrganizationalUnit (
    fields: string[],
    id
  ) {
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
      AND pou.id = ${id['id']}
      ORDER BY cou.idx , cou."createdAt";
      
      `
    }))
  }
  public static async getEmployeesByOrganizationalUnit (fields: string[], id) {
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
      AND ou."manager" != e.id
      AND e."firedAt" IS NULL
      AND ou.id = ${id['id']}
      ORDER BY e.idx, e."createdAt";
      
      `
    }))
  }
  public static async getAllEmployeesByOrganizationalUnit (fields: string[], id) {
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
        WHERE id = ${id['id']}
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
  public static async getSubordinadedOrganizationalUnitsByOrganizationalUnit (fields: string[], id) {
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
        WHERE "organizationalUnit" = ${id['id']}
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
  public static async getSubordinadedOrganizationalUnitsManagersByOrganizationalUnit (fields: string[], id) {
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
        WHERE "organizationalUnit" = ${id['id']}
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
  public static async getPositionalUnit (unfilteredFields: string[], args) {
    return this.getNode({
      table: POSITIONAL_UNITS_TABLE,
      tableFields: positionalUnitsTableFields,
      unfilteredFields,
      args
    })
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