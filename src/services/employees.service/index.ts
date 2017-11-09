import {
  DatabaseService, QueryConfig
} from './../database.service';
import { Organization } from './../../models/organization.model';
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

  public static async getEmployeesByPersonID (personID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `
      SELECT
        ep.*
      FROM
        emp.e_emp_e_person ep
      WHERE ep."personID" = ${personID}
      ORDER BY ep.id;`
    }))
  }
  public static async getEmployeesCount (personID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: `
      SELECT
        count(ep.id) "totalCount"
      FROM
        emp.e_emp_e_person ep
      WHERE ep."personID" = ${personID};`
    }))
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