import {
  DatabaseService, QueryConfig, ServiceConfig
} from './../database.service'
const EMPLOYEES_TABLE: string = 'organizations.e_emp'

import {
  NodesCountConfig,
  EdgesConfig,
  NodeConfig,
  NodesConfig
} from './../interfaces'

export class OrganizationsService extends DatabaseService {
  public static OrganizationConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  public static OrganizationalUnitConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  public static PositionalUnitConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  public static OrganizationContactsConfig: ServiceConfig = {
    table: '',
    tableFields: [],
  }
  constructor() {
    super()
    async function getOrganizationTableFields (table: string) {
      OrganizationsService.OrganizationConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) OrganizationsService.OrganizationConfig.tableFields = response
      else console.trace(response)
    }
    getOrganizationTableFields('organizations.e_organization')
    async function getOrganizationContactEdgesTableFields (table: string) {
      OrganizationsService.OrganizationContactsConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) OrganizationsService.OrganizationContactsConfig.tableFields = response
      else console.trace(response)
    }
    getOrganizationContactEdgesTableFields('organizations.r_e_organization_e_contact')
    async function getOrganizationalUnitTableFields (table: string) {
      OrganizationsService.OrganizationalUnitConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) OrganizationsService.OrganizationalUnitConfig.tableFields = response
      else console.trace(response)
    }
    getOrganizationalUnitTableFields('organizations.e_organizational_unit')
    async function getPositionalUnitTableFields (table: string) {
      OrganizationsService.PositionalUnitConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) OrganizationsService.PositionalUnitConfig.tableFields = response
      else console.trace(response)
    }
    getPositionalUnitTableFields('organizations.e_positional_unit')
  }
  public static getOrganizations (config: NodesConfig) {
    return this.getNodes(Object.assign({}, OrganizationsService.OrganizationConfig, config))
  }
  public static getOrganizationsCount (config: NodesCountConfig) {
    return this.getNodesCount(Object.assign({}, OrganizationsService.OrganizationConfig, config))
  }
  public static getOrganization (config: NodeConfig) {
    return this.getNode(Object.assign({}, OrganizationsService.OrganizationConfig, config))
  }
  public static createOrganization (config: { unfilteredFields: string[], data: any, user: number }) {
    return this.createNode(Object.assign({}, OrganizationsService.OrganizationConfig, config))
  }
  public static getOrganizationContactsCount (config: NodesCountConfig) {
    return this.getNodesCount(Object.assign({}, OrganizationsService.OrganizationContactsConfig, config))
  }
  public static getOrganizationContactsEdges (config: EdgesConfig) {
    return this.getEdges(Object.assign({}, OrganizationsService.OrganizationContactsConfig, config))
  }
  public static getPhone (config) {
    return this.getEdge(Object.assign({}, OrganizationsService.OrganizationContactsConfig, config))
  }
  public static updateOrganization (config: { unfilteredFields: string[], data: any, user: number }) {
    return this.updateNode(Object.assign({}, OrganizationsService.OrganizationConfig, config))
  }
  public static deleteOrganization (config: { unfilteredFields: string[], id: number, user: number }) {
    return this.deleteNode(Object.assign({}, OrganizationsService.OrganizationConfig, config))
  }
  public static getOrganizationalUnitsCount (config: NodesCountConfig) {
    const fields = ["\"name\"", '\' \'', "\"description\""]
    return this.getNodesCount(Object.assign({}, OrganizationsService.OrganizationalUnitConfig, config, { fields }))
  }
  public static getOrganizationalUnits (config: NodesConfig) {
    const fields = ["\"name\"", '\' \'', "\"description\""]
    return this.getNodes(Object.assign({}, OrganizationsService.OrganizationalUnitConfig, config, { fields }))
  }
  public static async getOrganizationalUnitsByOrganization (config: NodesConfig) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      OrganizationsService.OrganizationalUnitConfig.tableFields,
      config.unfilteredFields), 'ou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

        SELECT
          ${requestedFields}
        FROM
          ${OrganizationsService.OrganizationalUnitConfig.table} ou,
          ${OrganizationsService.OrganizationConfig.table} o
        WHERE ou."organization" = o.id
        AND o.id = ${config.source['id']}
        ORDER BY ou.idx ASC, ou."createdAt";

      `
    }))
  }
  public static async getOrganizationalUnit (config: NodeConfig) {
    return this.getNode(Object.assign({}, OrganizationsService.OrganizationalUnitConfig, config))
  }
  public static async createOrganizationalUnit (config: { unfilteredFields: string[], data: any, user: number }) {
    return this.createNode(Object.assign({}, OrganizationsService.OrganizationalUnitConfig, config))
  }
  public static updateOrganizationalUnit (config: { unfilteredFields: string[], target: { [key: string]: any }, data: any, user: number }) {
    return this.updateNode(Object.assign({}, OrganizationsService.OrganizationalUnitConfig, config))
  }
  public static deleteOrganizationalUnit (config: { unfilteredFields: string[], id: number, user: number }) {
    return this.deleteNode(Object.assign({}, OrganizationsService.OrganizationalUnitConfig, config))
  }
  public static async getSubordinatedOrganizationalUnitsByEmployee (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      OrganizationsService.OrganizationalUnitConfig.tableFields,
      config.unfilteredFields), 'ou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${OrganizationsService.OrganizationalUnitConfig.table} ou,
        ${EMPLOYEES_TABLE} e
      WHERE ou.curator = e.id
      AND e.id = ${config.source['id']}
      ORDER BY ou.idx ASC, ou."createdAt";
      
      `
    }))
  }

  public static async getChildOrganizationalUnitsByOrganizationalUnit (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      OrganizationsService.OrganizationalUnitConfig.tableFields,
      config.unfilteredFields), 'cou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        ${requestedFields}
      FROM
        ${OrganizationsService.OrganizationalUnitConfig.table} cou,
        ${OrganizationsService.OrganizationalUnitConfig.table} pou
      WHERE cou."organizationalUnit" = pou.id
      AND pou.id = ${config.source['id']}
      ORDER BY cou.idx , cou."createdAt";
      
      `
    }))
  }
  public static async getSubordinadedOrganizationalUnitsByOrganizationalUnit (config) {
    const requestedFields = this.buildFieldSet(this.filterFields(
      OrganizationsService.OrganizationalUnitConfig.tableFields,
      config.unfilteredFields), 'ou')
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT  
        ${requestedFields}
      FROM
        ${OrganizationsService.OrganizationalUnitConfig.table} ou
      WHERE ou.id in (
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
  public static async getPositionalUnit (config: NodeConfig) {
    return this.getNode(Object.assign({}, OrganizationsService.PositionalUnitConfig, config))
  }
}

const os = new OrganizationsService()