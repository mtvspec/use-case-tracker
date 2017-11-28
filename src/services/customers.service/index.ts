import {
  DatabaseService, QueryConfig
} from './../database.service';
import { Organization } from './../../models/organization.model'
import { Customer } from '../../models/customer.model'
export class CustomersService extends DatabaseService {
  public static async getCustomersCount () {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(c.id) "totalCount"
      FROM
        customers.e_customer c;`
    }))
  }

  public static async getCustomersProjectsCount (customerID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(p.id) "totalCount"
      FROM
        projects.e_project p,
        customers.e_customer c
      WHERE p."customerID" = c.id
      AND c.id = ${customerID};`
    }))
  }

  public static async getCustomersProjects (customerID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        p.*
      FROM
        customers.e_customer c,
        projects.e_project p
      WHERE p."customerID" = c.id
      AND c.id = ${customerID}
      ORDER BY p.id ASC;`
    }))
  }

  public static async getCustomers () {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        c.*
      FROM
        customers.e_customer c
      ORDER BY c.id ASC;`
    }))
  }
  public static async getCustomer (id: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        *
      FROM
        customers.e_customer c
      WHERE id = ${id};`
    }))
  }
  public static async getProjects (id: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        *,
        (
          SELECT
            count(pm.id)
          FROM
            projects.e_project_member pm,
            projects.e_project_team pt
          WHERE pt."projectID" = p.id
          AND pm."teamID" = pt.id
        ) "teamMembersCount"
      FROM
        projects.e_project p
      WHERE "customerID" = ${id};`
    }))
  }
  public static async getCustomersByPersonID (personID: number):
    Promise<Customer[]> {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        c.*
      FROM
        persons.e_person p,
        customers.e_customer c,
        projects.e_project pr,
        projects.e_project_team pt,
        projects.e_project_member pm
      WHERE pr."customerID" = c.id
      AND pt."projectID" = pr.id
      AND pm."teamID" = pt.id
      AND pm."personID" = p.id
      AND p.id = ${personID};`
    })) as Customer[]
  }
}