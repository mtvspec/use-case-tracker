import CommonResolvers from './../common'
import { OrganizationsService } from './../../../services/organizations.service'
import { EmployeesService } from './../../../services/employees.service'
import { PersonsService } from './../../../services/persons.service'
import { DictService } from '../../../services/index'
const getOrganization = async (_, args: { id: number }, ctx, info) => {
  const fields: string[] = Object.keys(ctx.utils.parseFields(info))
  return await OrganizationsService.getOrganization(fields, { id: args.id })
}
const getOrganizationalUnit = async (_, args: { id: number }, ctx, info) => {
  const fields: string[] = Object.keys(ctx.utils.parseFields(info))
  return await OrganizationsService.getOrganizationalUnit(fields, { id: args.id })
}
const getManager = async (root: { manager: number }, _, ctx, info) => {
  const fields: string[] = Object.keys(ctx.utils.parseFields(info))
  return root && root.manager ?
    await EmployeesService.getEmployee(fields, { id: root.manager }) : null
}
const getEmployee = async (_, args: { id: number }, ctx, info) => {
  const fields: string[] = Object.keys(ctx.utils.parseFields(info))
  return await EmployeesService.getEmployee(fields, { id: args.id })
}
const Organization = {
  organizationalUnits: async (root: { id: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getOrganizationalUnits(fields, { id: root.id })
  },
  manager: getManager,
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const OrganizationsConnection = {
  totalCount: async (_) => {
    return await OrganizationsService.getOrganizationsCount()
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  organizations: async (_, args, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getOrganizations(fields, args, null, ['name'])
  }
}
const OrganizationalUnit = {
  organization: async (root: { organization: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.organization > 0 ?
      await OrganizationsService.getOrganization(fields, { id: root.organization }) : null
  },
  organizationalUnit: async (root: { organizationalUnit: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.organizationalUnit > 0 ?
      await OrganizationsService.getOrganizationalUnit(fields, { id: root.organizationalUnit }) : null
  },
  kind: async (root: { kind: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.kind > 0 ?
      await DictService.getDictValue(fields, { id: root.kind }) : null
  },
  type: async (root: { type: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.type > 0 ?
      await DictService.getDictValue(fields, { id: root.type }) : null
  },
  manager: async (root: { manager: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root && root.manager > 0 ?
      await EmployeesService.getEmployee(fields, { id: root.manager }) : null
  },
  managers: async (root: { id: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return OrganizationsService.getManagersByOrganizationalUnit(fields, { id: root.id })
  },
  childOrganizationalUnits: async (root: { id: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getChildOrganizationalUnitsByOrganizationalUnit(fields, { id: root.id })
  },
  employees: async (root: { id: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getEmployeesByOrganizationalUnit(fields, { id: root.id })
  },
  allEmployees: async (root: { id: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getAllEmployeesByOrganizationalUnit(fields, { id: root.id })
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
    return root && root.id ?
      await EmployeesService.getEmployeesCount(root.id)
        .then((data: { totalCount: number }) => { return data.totalCount }) : null
  },
  edges: async (root: { id: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.id ?
      await EmployeesService.getEmployeesByPerson(fields, { source: root.id }) : null
  }
}
const PersonEmployeeEdge = {
  node: async (root: { node: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await EmployeesService.getEmployee(fields, { id: root.node })
  }
}
const Employee = {
  person: async (root: { person: number, args: { [key: string]: any } }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPerson(fields, { id: root.person })
  },
  organization: async (root: { organization: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.organization > 0 ?
      await OrganizationsService.getOrganization(fields, { id: root.organization }) : null
  },
  organizationalUnit: async (root: { organizationalUnit: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.organizationalUnit ?
      await OrganizationsService.getOrganizationalUnit(fields, { id: root.organizationalUnit }) : null
  },
  positionalUnit: async (root: { positionalUnit: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.positionalUnit ?
      await OrganizationsService.getPositionalUnit(fields, { id: root.positionalUnit }) : null
  },
  manager: async (root: { manager: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.manager ?
      await EmployeesService.getEmployee(fields, { id: root.manager }) : null
  },
  subordinates: async (root, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getSubordinades(fields, { id: root.id })
  },
  subordinatedOrganizationalUnits: async (root: { id: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await OrganizationsService.getSubordinatedOrganizationalUnitsByEmployee(fields, { id: root.id })
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

export default {
  getOrganization,
  Organization,
  OrganizationsConnection,
  getOrganizationalUnit,
  OrganizationalUnit,
  PositionalUnit,
  getEmployee,
  Employee,
  EmployeesConnection,
  PersonEmployeeEdge,
}