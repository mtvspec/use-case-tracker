import {
  DatabaseService, QueryConfig
} from './../database.service';
import { Organization } from './../../models/organization.model';
import db from './../../knex'
const employeesTable: string = 'emp.e_emp'
const totalCount: string = 'id as totalCount'
export class EmployeesService extends DatabaseService {
  public static async getEmployees () {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        *
      FROM
        emp.e_emp
      ORDER BY id;`
    }))
  }
  public static async getEmployee (id: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        e.*
      FROM
        emp.e_emp e
      WHERE e.id = ${id};`
    }))
  }

  public static async getEmployeesByPersonID (person: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        ep.*
      FROM
        emp.e_emp_e_person ep
      WHERE ep."person" = ${person}
      ORDER BY ep.id;`
    }))
  }
  public static async getEmployeesCount (person: number) {
    return db(employeesTable)
      .where({ person })
      .count(totalCount).first()
  }
  public static async getSubordinatesByEmployeeID (employeeID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        s.*
      FROM
        emp.e_emp m,
        emp.e_emp s
      WHERE s."managerID" = m.id
      AND m.id = ${employeeID}
      ORDER BY s.id;`
    }))
  }
}