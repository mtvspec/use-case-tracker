import { DatabaseService, QueryConfig } from './../database.service'
const EMPLOYEES_TABLE: string = 'organizations.e_emp'
const EMPLOYEE_PERSON_EDGES_TABLE: string = 'organizations.r_e_emp_e_person'
let employeesTableFields: string[] = []
let employeePersonEdgesTableFields: string[] = []
export class EmployeesService extends DatabaseService {
  public static getEmployees (unfilteredFields: string[], orderBy: string[]) {
    return this.getNodes({
      table: EMPLOYEES_TABLE,
      tableFields: employeesTableFields,
      unfilteredFields,
      args: null,
      except: null,
      orderBy
    })
  }
  public static getEmployee (unfilteredFields: string[], args) {
    return this.getNode({
      table: EMPLOYEES_TABLE,
      tableFields: employeesTableFields,
      unfilteredFields,
      args
    })
  }

  public static getEmployeesByPerson (unfilteredFields: string[], source, args?: any) {
    return this.getEdges(
      EMPLOYEE_PERSON_EDGES_TABLE,
      employeePersonEdgesTableFields,
      unfilteredFields,
      source,
      args
    )
  }
  public static getEmployeesCount (args?) {
    return this.getNodesCount({
      table: EMPLOYEE_PERSON_EDGES_TABLE,
      tableFields: employeePersonEdgesTableFields,
      args
    })
  }
  public static async getSubordinatesByEmployee (employeeID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: `

      SELECT
        s.*
      FROM
        ${EMPLOYEES_TABLE} m,
        ${EMPLOYEES_TABLE} s
      WHERE s."manager" = m.id
      AND m.id = ${employeeID}
      ORDER BY s.id;
      
      `
    }))
  }
}

(async function getEmployeesTableFields () {
  const response: any = await <any>EmployeesService.fields(EMPLOYEES_TABLE)
  if (response && response.length > 0) employeesTableFields = response
  else console.trace(response)
})();

(async function getEmployeePersonEdgesTableFields () {
  const response: any = await <any>EmployeesService.fields(EMPLOYEE_PERSON_EDGES_TABLE)
  if (response && response.length > 0) employeePersonEdgesTableFields = response
  else console.trace(response)
})();
