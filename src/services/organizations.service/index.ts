import queries from './queries'
import {
  DatabaseService, QueryConfig
} from './../database.service';
import { Organization } from './../../models/organization.model';
import { INewOrganizationalUnitData, IUpdatedOrganizationalUnitData } from '../../graphql/resolvers/organizations/mutations';
import { convertData, field } from '../../utils/index';
import db from './../../knex'
const ORGANIZATIONS_TABLE: string = 'organizations.e_organization'
const ORGANIZATIONAL_UNITS_TABLE: string = 'organizations.e_organizational_unit'

let organizationTableFields: field[] = []
let organizationalUnitsTableFields: field[] = []

export class OrganizationsService extends DatabaseService {
  public static async getOrganization (unfilteredFields: field[], id: number) {
    return this.getNode(
      ORGANIZATIONS_TABLE,
      organizationTableFields,
      unfilteredFields,
      id
    )
  }
  public static async getOrganizationalUnits (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
        
        SELECT
          ou.*
        FROM
          organizations.e_organizational_unit ou,
          organizations.e_organization o
        WHERE ou."organizationID" = o.id
        AND o.id = ${id};

      `
    }))
  }
  public static async createOrganizationalUnit (data: INewOrganizationalUnitData, user: number) {
    return this.createNode(
      ORGANIZATIONAL_UNITS_TABLE,
      data,
      user
    )
  }
  public static updateOrganizationalUnit (data: IUpdatedOrganizationalUnitData, user: number) {
    return this.updateNode(
      ORGANIZATIONAL_UNITS_TABLE,
      data,
      user
    )
  }
  public static getOrganizations (unfilteredFields: field[]) {
    return this.getNodes(
      ORGANIZATIONAL_UNITS_TABLE,
      organizationalUnitsTableFields,
      unfilteredFields
    )
  }
  public static async getOrganizationsCount () {
    return this.getNodesCount(
      ORGANIZATIONS_TABLE
    )
  }
  public static async getSubordinades (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
        SELECT
          s.*
        FROM
          emp.e_emp s,
          emp.e_emp m
        WHERE s."managerID" = m.id
        AND m.id = ${id};
      `
    }))
  }
  public static async getOrganizationalUnitByOrganizationID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.GET_ORGANIZATIONAL_UNIT_BY_ORGANIZATION_ID(organizationalUnitID)
    }))
  }
  public static async getOrganizationalUnitByPositionalUnitID (positionalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        ou.*
      FROM
        organizations.e_positional_unit pu,
        organizations.e_organizational_unit ou
      WHERE pu."organizationalUnitID" = ou.id
      AND pu.id = ${positionalUnitID};`
    }))
  }
  public static async getPositionalUnitsByOrganizationalUnitID (organizationUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        pu.*
      FROM
        organizations.e_positional_unit pu,
        organizations.e_organizational_unit ou
      WHERE pu."organizationalUnitID" = ou.id
      AND ou.id = ${organizationUnitID}
      ORDER BY pu.id;`
    }))
  }
  public static async getOrganizationalUnit (organizationUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        ou.*
      FROM
        organizations.e_organizational_unit ou
      WHERE ou.id = ${organizationUnitID};`
    }))
  }
  public static async getOrganizationalUnitByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        p.*
      FROM
        organizations.e_organizational_unit p,
        organizations.e_organizational_unit c
      WHERE c."organizationalUnitID" = p.id
      AND c.id = ${organizationalUnitID};`
    }))
  }
  public static async getManagersByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.organizations.GET_ORGANIZATIONAL_UNIT_MANAGERS_BY_ORGANIZATIONAL_UNIT_ID(organizationalUnitID)
    }))
  }
  public static async getManagerByID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.GET_MANAGER_BY_ID(organizationalUnitID)
    }))
  }
  public static async getPositionalUnitByPositionalUnitID (positionalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        pu.*
      FROM
        organizations.e_positional_unit pu
      WHERE pu.id = ${positionalUnitID};`
    }))
  }
  public static async getChildOrganizationalUnitsByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        cou.*
      FROM
        organizations.e_organizational_unit cou,
        organizations.e_organizational_unit pou
      WHERE cou."organizationalUnitID" = pou.id
      AND pou.id = ${organizationalUnitID}
      ORDER BY cou.id;`
    }))
  }
  public static async getEmployeesByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        e.*
      FROM
        organizations.e_organizational_unit ou,
        emp.e_emp e
      WHERE e."organizationalUnitID" = ou.id
      --AND ou."managerID" != e.id
      AND e."firedAt" IS NULL
      AND ou.id = ${organizationalUnitID}
      ORDER BY ou.id;`
    }))
  }
  public static async getAllEmployeesByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        e.*
      FROM
        emp.e_emp e,
        persons.e_person p
      WHERE e."personID" = p.id
      AND e."organizationalUnitID" in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          organizations.e_organizational_unit
        WHERE id = ${organizationalUnitID}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN organizations.e_organizational_unit cou ON cou."organizationalUnitID" = pou.id
      )
      SELECT
        id
      FROM
        cte
      ORDER BY level
      );`
    }))
  }
  public static async getSubordinadedOrganizationalUnitsByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT  
        ou.*
      FROM
        organizations.e_organizational_unit ou
      WHERE ou.id in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          organizations.e_organizational_unit
        WHERE "organizationalUnitID" = ${organizationalUnitID}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN organizations.e_organizational_unit cou ON cou."organizationalUnitID" = pou.id
      )
      SELECT
        id
      FROM
        cte
      ORDER BY level
      );`
    }))
  }
  public static async getSubordinadedOrganizationalUnitsManagersByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT  
        m.*
      FROM
        emp.e_emp m,
        organizations.e_organizational_unit ou
      WHERE ou."managerID" = m.id
      AND ou.id in (
      WITH RECURSIVE cte AS (
        SELECT
          id, 1 AS level
        FROM
          organizations.e_organizational_unit
        WHERE "organizationalUnitID" = ${organizationalUnitID}
        UNION ALL
        SELECT
          cou.id, pou.level + 1
        FROM cte pou
        JOIN organizations.e_organizational_unit cou ON cou."organizationalUnitID" = pou.id
      )
      SELECT
        id
      FROM
        cte
      ORDER BY level
      );`
    }))
  }
  public static async getPositionalUnitByEmployeeID (employeeID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        pu.*
      FROM
        organizations.e_positional_unit pu,
        emp.e_emp e
      WHERE e."positionalUnitID" = pu.id
      AND e.id = ${employeeID};`
    }))
  }
  public static async getOrganizationalUnitIDByEmployeeID (employeeID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        ou.*
      FROM
        organizations.e_positional_unit ou,
        emp.e_emp e
      WHERE e."organizationalUnitID" = ou.id
      AND e.id = ${employeeID};`
    }))
  }
  public static async getOrganizationByOrganizationalUnitID (organizationalUnitID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        o.*
      FROM
        organizations.e_organization o,
        organizations.e_organizational_unit ou
      WHERE ou."organizationID" = o.id
      AND ou.id = ${organizationalUnitID};`
    }))
  }
  public static createOrganization (data: any, user: number) {
    return this.createNode(
      ORGANIZATIONS_TABLE,
      data,
      user
    )
  }
  public static updateOrganization (data: any, user: number) {
    return this.updateNode(
      ORGANIZATIONS_TABLE,
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
}

const getOrganizationTableFields = (async () => {
  const response: any = await <any>OrganizationsService.fields(ORGANIZATIONS_TABLE)
  response.forEach((field: any) => organizationTableFields.push(field.name))
})()

const getOrganizationalUnitTableFields = (async () => {
  const response: any = await <any>OrganizationsService.fields(ORGANIZATIONAL_UNITS_TABLE)
  response.forEach((field: any) => organizationalUnitsTableFields.push(field.name))
})()