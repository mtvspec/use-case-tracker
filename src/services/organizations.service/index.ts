import queries from './queries'
import {
  DatabaseService, QueryConfig
} from './../database.service';
import { Organization } from './../../models/organization.model';
export class OrganizationsService extends DatabaseService {
  public static async getOrganization (id: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.GET_ORGANIZATION_BY_ID(id)
    }))
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
  public static async getOrganizations () {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.organizations.GET_ORGANIZATIONS()
    }))
  }
  public static async getOrganizationsCount () {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.GET_ORGANIZATIONS_COUNT()
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
  public static async getOrganizationalUnitByID (organizationUnitID: number) {
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
      AND ou."managerID" != e.id
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
  public static async createOrganization (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.INSERT_ORGANIZATION(data)
    }))
  }
  public static async updateOrganization (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.UPDATE_ORGANIZATION(data)
    }))
  }
  public static async deleteOrganization (data: any) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.organizations.DELETE_ORGANIZATION(data)
    }))
  }
}