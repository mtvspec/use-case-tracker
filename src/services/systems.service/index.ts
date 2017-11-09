import {
  DatabaseService, QueryConfig
} from './../database.service'
import db from './../../knex'
import queries from './queries'
const systemsTable: string = 'systems.e_system'
const componentsTable: string = 'components.e_component'
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
        components.e_component cc,
        components.e_component pc
      WHERE cc."componentID" = pc.id
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
        components.e_component c,
        systems.e_system s,
        systems.r_e_system_e_component sc
      WHERE sc."systemID" = s.id
      AND sc."componentID" = c.id
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
        components.e_component c,
        components.e_component p
      WHERE c."componentID" = p.id
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
        components.e_component cc
      INNER JOIN components.e_component pc ON cc."componentID" = pc.id
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
        components.r_e_component_e_issue ci
      INNER JOIN components.e_component c ON ci."componentID" = c.id
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
        components.r_e_component_e_issue ci
      INNER JOIN components.e_component c ON ci."componentID" = c.id
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
      INNER JOIN components.r_e_component_e_issue ci ON ci."issueID" = i.id
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
        components.e_component c,
        systems.e_system s,
        systems.r_e_system_e_component sc
      WHERE sc."systemID" = s.id
      AND sc."componentID" = c.id
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