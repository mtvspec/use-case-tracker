import CommonResolvers from './../common'
import { OrganizationsService } from './../../../services/organizations.service'
import { EmployeesService } from './../../../services/employees.service'
import { PersonsService } from './../../../services/persons.service'
import { DictService } from '../../../services/index'
const getOrganizationalUnit = async (_: any, args: { id: number }, ctx: any, info: any) => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return await OrganizationsService.getOrganizationalUnit(fields, args.id)
}

const getOrganization = async (root: any, args: any, ctx: any, info: any) => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return await OrganizationsService.getOrganization(fields, args.id)
}

const getManager = async (root: { manager: number }, _: any, ctx: any, info: any) => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return root.manager ?
    await EmployeesService.getEmployee(fields, root.manager) : null
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
      .then((data: any) => { return data.totalCount })
  },
  organizations: async (_: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getOrganizations(fields)
  }
}

const OrganizationalUnit = {
  organization: async (root: { organization: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.organization > 0 ?
      await OrganizationsService.getOrganization(fields, root.organization) : null
  },
  organizationalUnit: async (root: { organizationalUnit: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.organizationalUnit > 0 ?
      await OrganizationsService.getOrganizationalUnit(fields, root.organizationalUnit) : null
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
  manager: async (root: { manager: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.manager > 0 ?
      await EmployeesService.getEmployee(fields, root.manager) : null
  },
  managers: async (root: { id: number }) => {
    return OrganizationsService.getManagersByOrganizationalUnitID(root.id)
  },
  childOrganizationalUnits: async (root: { id: number }) => {
    return await OrganizationsService.getChildOrganizationalUnitsByOrganizationalUnit(root.id)
  },
  employees: async (root: { id: number }) => {
    return await OrganizationsService.getEmployeesByOrganizationalUnit(root.id)
  },
  allEmployees: async (root: { id: number }) => {
    return await OrganizationsService.getAllEmployeesByOrganizationalUnit(root.id)
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
        .then((data: any) => { return data.totalCount }) : null
  },
  edges: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.id ?
      await EmployeesService.getEmployeesByPersonID(fields, root.id) : null
  }
}

const PersonEmployeeEdge = {
  node: async (root: { node: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await EmployeesService.getEmployee(fields, root.node)
  }
}

const Employee = {
  person: async (root: any, _: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPerson(fields, root.person, root.args)
  },
  organizationalUnit: async (root: { organizationalUnit: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.organizationalUnit ?
      await OrganizationsService.getOrganizationalUnit(fields, root.organizationalUnit) : null
  },
  positionalUnit: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.positionalUnit ?
      await OrganizationsService.getPositionalUnit(fields, root.positionalUnit) : null
  },
  manager: async (root: { manager: number }, _: any, ctx: any, info: any) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root.manager ?
      await EmployeesService.getEmployee(fields, root.manager) : null
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