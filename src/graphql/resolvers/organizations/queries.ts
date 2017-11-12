import CommonResolvers from './../common'
import { OrganizationsService } from './../../../services/organizations.service'
import { EmployeesService } from './../../../services/employees.service'
import { PersonsService } from './../../../services/persons.service'
import { DictService } from '../../../services/index';
const getOrganizationalUnit = async (_: any, args: { id: number }) => {
  return await OrganizationsService.getOrganizationalUnit(args.id)
}

const getOrganization = async (_: any, args: { id: number }, ctx: any, info: any) => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return await OrganizationsService.getOrganization(fields, args.id)
}

const getManager = async (root: { manager: number }) => {
  return root.manager ?
    await EmployeesService.getEmployee(root.manager) : null
}

const Organization = {
  organizationalUnits: async (root: { id: number }) => {
    return await OrganizationsService.getOrganizationalUnits(root.id)
  },
  manager: getManager,
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const OrganizationsConnection = {
  totalCount: async (_: any) => {
    return await OrganizationsService.getOrganizationsCount()
      .then(({ totalCount }) => { return totalCount })
  },
  organizations: async (_: any) => {
    return await OrganizationsService.getOrganizations()
  }
}

const OrganizationalUnit = {
  organization: async (root: { organization: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.organization > 0 ?
      await OrganizationsService.getOrganization(fields, root.organization) : null
  },
  organizationalUnit: async (root: { organizationalUnit: number }) => {
    return root.organizationalUnit > 0 ?
      await OrganizationsService.getOrganizationalUnit(root.organizationalUnit) : null
  },
  kind: async (root: { kind: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.kind > 0 ?
      await DictService.getDictValue(fields, root.kind) : null
  },
  type: async (root: { type: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.type > 0 ?
      await DictService.getDictValue(fields, root.type) : null
  },
  manager: async (root: { manager: number }) => {
    return root.manager > 0 ?
      await OrganizationsService.getManagerByID(root.manager) : null
  },
  managers: async (root: { id: number }) => {
    return OrganizationsService.getManagersByOrganizationalUnitID(root.id)
  },
  childOrganizationalUnits: async (root: { id: number }) => {
    return await OrganizationsService.getChildOrganizationalUnitsByOrganizationalUnitID(root.id)
  },
  employees: async (root: { id: number }) => {
    return await OrganizationsService.getEmployeesByOrganizationalUnitID(root.id)
  },
  allEmployees: async (root: { id: number }) => {
    return await OrganizationsService.getAllEmployeesByOrganizationalUnitID(root.id)
  },
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const PositionalUnit = {
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const EmployeesConnection = {
  totalCount: async (root: { id: number }) => {
    return root.id ?
      await EmployeesService.getEmployeesCount(root.id)
        .then(({ totalCount }) => { return totalCount }) : null
  },
  edges: async (root: any) => {
    return root.id ?
      await EmployeesService.getEmployeesByPersonID(root.id) : null
  }
}

const PersonEmployeeEdge = {
  node: async (root: { emp: number }) => {
    return await EmployeesService.getEmployee(root.emp)
  }
}

const Employee = {
  person: async (root: { person: number }, _: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPerson(fields, root.person)
  },
  organizationalUnit: async (root: { organizationalUnit: number }) => {
    return root.organizationalUnit ?
      await OrganizationsService.getOrganizationalUnit(root.organizationalUnit) : null
  },
  positionalUnit: async (root: any) => {
    return root.positionalUnitID ?
      await OrganizationsService.getPositionalUnitByEmployeeID(root.id) : null
  },
  manager: async (root: any) => {
    return root.managerID ?
      await EmployeesService.getEmployee(root.managerID) : null
  },
  subordinates: async (root: any) => {
    return await OrganizationsService.getSubordinades(root.id)
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

export default {
  OrganizationsConnection,
  Organization,
  getOrganizationalUnit,
  getOrganization,
  OrganizationalUnit,
  PositionalUnit,
  EmployeesConnection,
  PersonEmployeeEdge,
  Employee,
}