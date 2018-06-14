import { DatabaseService, QueryConfig, ServiceConfig } from './../database.service'
import { EdgesConfig, NodesConfig, NodeConfig, EdgesCountConfig } from '../interfaces'
import { OrganizationsService } from '../index'

export class EmployeesService extends DatabaseService {
  private static EmployeeConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  private static PersonEmployeeConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  constructor() {
    super()
    async function getEmployeesTableFields (table: string) {
      EmployeesService.EmployeeConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) EmployeesService.EmployeeConfig.tableFields = response
      else console.trace(response)
    }
    getEmployeesTableFields('organizations.e_emp')
    async function getEmployeePersonEdgesTableFields (table: string) {
      EmployeesService.PersonEmployeeConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) EmployeesService.PersonEmployeeConfig.tableFields = response
      else console.trace(response)
    }
    getEmployeePersonEdgesTableFields('organizations.r_e_emp_e_person')
  }
  public static async getManager (config: NodeConfig) {
    return this.getNode(Object.assign({}, EmployeesService.EmployeeConfig, config))
  }
  public static getEmployees (config: NodesConfig) {
    return this.getNodes(Object.assign({}, EmployeesService.PersonEmployeeConfig, config))
  }
  public static getEmployee (config: NodeConfig) {
    return this.getNode(Object.assign({}, EmployeesService.EmployeeConfig, config))
  }

  public static getEmployeesByPerson (config: EdgesConfig) {
    return this.getEdges(Object.assign({}, EmployeesService.PersonEmployeeConfig, config))
  }
  public static getEmployeesCount (config: EdgesCountConfig) {
    return this.getNodesCount(Object.assign({}, EmployeesService.PersonEmployeeConfig, config))
  }
  public static async getSubordinades (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      EmployeesService.EmployeeConfig.tableFields,
      config.unfilteredFields), 's')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${EmployeesService.EmployeeConfig.table} s,
          ${EmployeesService.EmployeeConfig.table} m
        WHERE s."manager" = m.id
        AND m.id = ${config.source['id']}
        ORDER BY s.idx ASC, s."createdAt";

      `
    }))
  }
  public static async getEmployeesByBirthdayMonth (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      PersonsService.PersonConfig.tableFields,
      config.unfilteredFields), 'p')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${PersonsService.PersonConfig.table} p,
          ${EmployeesService.EmployeeConfig.table} e
        WHERE extract(month from p.dob) = ${config.source['month']}
        AND p."isDeleted" = false
        AND e.person = p.id
        AND e.organization = 1
        ORDER BY extract(day from p.dob) asc, p."lastName", p."firstName", p."middleName";

      `
    }))
    // return db(`${PersonsService.PersonConfig.table} "p"`)
    //   .select(this.filterFields(PersonsService.PersonConfig.tableFields, config.unfilteredFields))
    //   .innerJoin(`${EmployeesService.EmployeeConfig.table}`, `${PersonsService.PersonConfig.table}.id`, `${EmployeesService.EmployeeConfig.table}.person`).as('e')
    //   .whereRaw(`extract(month from p.dob) = ${config.source['month']}`)
    //   .andWhereRaw(`e.id = ${config.source['id']}`)
  }
  public static async getEmployeesByOrganizationalUnit (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      EmployeesService.EmployeeConfig.tableFields,
      config.unfilteredFields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${EmployeesService.EmployeeConfig.table} e,
          ${OrganizationsService.OrganizationalUnitConfig.table} ou
        WHERE e."organizationalUnit" = ou.id
        AND ou."manager" != e.id
        AND e."firedAt" IS NULL
        AND ou.id = ${config.source['id']}
        ORDER BY e.idx, e."createdAt";
      
      `
    }))
  }
  public static async getSubordinadedOrganizationalUnitsManagersByOrganizationalUnit (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      EmployeesService.EmployeeConfig.tableFields,
      config.unfilteredFields), 'm')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT  
        ${requestedFields}
      FROM
        ${EmployeesService.EmployeeConfig.table} m,
        ${OrganizationsService.OrganizationalUnitConfig.table} ou
      WHERE ou."manager" = m.id
      AND ou.id in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          ${OrganizationsService.OrganizationalUnitConfig.table}
        WHERE "organizationalUnit" = ${config.source['id']}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN ${OrganizationsService.OrganizationalUnitConfig.table} cou ON cou."organizationalUnit" = pou.id
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
  public static async getAllEmployeesByOrganizationalUnit (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      EmployeesService.EmployeeConfig.tableFields,
      config.unfilteredFields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${EmployeesService.EmployeeConfig.table} e,
        persons.e_person p
      WHERE e."person" = p.id
      AND e."organizationalUnit" in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          ${OrganizationsService.OrganizationalUnitConfig.table}
        WHERE id = ${config.source['id']}
        UNION ALL
        SELECT
          id
        FROM
          cte
        ORDER BY level
        );
      
      `
    }))
  }
  public static async getManagersByOrganizationalUnit (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      EmployeesService.EmployeeConfig.tableFields,
      config.unfilteredFields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${EmployeesService.EmployeeConfig.table} e,
          ${OrganizationsService.OrganizationalUnitConfig.table} ou
        WHERE ou."managerID" = e.id
        AND ou.id = ${config.sourse['id']}
        ORDER BY e.idx, e."createdAt";
      
      `
    }))
  }
  public static async getSubordinatesByEmployee (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      EmployeesService.EmployeeConfig.tableFields,
      config.unfilteredFields), 'e')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${EmployeesService.EmployeeConfig.table} m,
          ${EmployeesService.EmployeeConfig.table} s
        WHERE s."manager" = m.id
        AND m.id = ${config.source['id']}
        ORDER BY s.id;
      
      `
    }))
  }
}

const es = new EmployeesService()