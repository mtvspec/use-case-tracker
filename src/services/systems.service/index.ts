import {
  DatabaseService, QueryConfig
} from './../database.service'
import db from './../../knex'
import queries from './queries'
const systemsTable: string = 'systems.e_system'
const componentsTable: string = 'systems.e_component'
export class SystemsService extends DatabaseService {
  public static async getSystemByID (id: number) {
    return await db
      .from(systemsTable)
      .where({ id }).first()
  }
  public static async getComponentByID (id: number) {
    return await db
      .from(componentsTable)
      .where({ id }).first()
  }
  public static async getChildComponents (componentID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        cc.*
      FROM
        systems.e_component cc,
        systems.e_component pc
      WHERE cc."component" = pc.id
      AND pc.id = ${componentID}
      ORDER BY cc.name ASC;`
    }))
  }
  public static async getSystemComponents (systemID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        c.*
      FROM
        systems.e_component c,
        systems.e_system s,
        systems.r_e_system_e_component sc
      WHERE sc."system" = s.id
      AND sc."component" = c.id
      AND s.id = ${systemID}
      ORDER BY c.name ASC;`
    }))
  }
  public static async getParentComponent (componentID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        p.*
      FROM
        systems.e_component c,
        systems.e_component p
      WHERE c."component" = p.id
      AND c.id = ${componentID};`
    }))
  }
  public static async getChildComponentsCount (componentID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(cc.id) "totalCount"
      FROM
        systems.e_component cc
      INNER JOIN systems.e_component pc ON cc."component" = pc.id
      AND pc.id = ${componentID};`
    }))
  }
  public static async getComponentIssuesEdgesCount (componentID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(ci.id) "totalCount"
      FROM
        systems.r_e_component_e_issue ci
      INNER JOIN systems.e_component c ON ci."component" = c.id
      WHERE c.id = ${componentID};`
    }))
  }
  public static async getComponentIssuesEdges (componentID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        ci.*
      FROM
        systems.r_e_component_e_issue ci
      INNER JOIN systems.e_component c ON ci."component" = c.id
      WHERE c.id = ${componentID};`
    }))
  }
  public static async getComponentIssue (edgeID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        i.*
      FROM
        issues.e_issue i
      INNER JOIN systems.r_e_component_e_issue ci ON ci."issue" = i.id
      WHERE ci.id = ${edgeID};`
    }))
  }
  public static async getSystemComponentsCount (systemID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(c.id) "totalCount"
      FROM
        systems.e_component c,
        systems.e_system s,
        systems.r_e_system_e_component sc
      WHERE sc."system" = s.id
      AND sc."component" = c.id
      AND s.id = ${systemID}`
    }))
  }
  public static async createComponent (data) {

    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.systems.INSERT_COMPONENT(data)
    }))
  }
  public static async updateComponent (data) {

    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.systems.UPDATE_COMPONENT(data)
    }))
  }
}