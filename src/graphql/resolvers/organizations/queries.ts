import CommonResolvers from './../common'
import ContactsResolvers from './../contacts'
import { OrganizationsService } from './../../../services/organizations.service'
import { EmployeesService } from './../../../services/employees.service'
import { PersonsService } from './../../../services/persons.service'
import { DictService, ContactsService } from '../../../services/index'
const getOrganization = async (_, args: { id: number }, ctx, info) => {
  return await OrganizationsService.getOrganization({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: args.id }
  })
}
const getOrganizationalUnit = async (_, args: { id: number }, ctx, info) => {
  return await OrganizationsService.getOrganizationalUnit({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: args.id }
  })
}
const getManager = async (root: { manager: number }, _, ctx, info) => {
  return root && root.manager ?
    await EmployeesService.getEmployee({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.manager }
    }) : null
}
const getEmployee = async (_, args: { id: number }, ctx, info) => {
  return await EmployeesService.getEmployee({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: args.id }
  })
}
const getEmployeesByBirthdayMonth = async (_, args: { month: number }, ctx, info) => {
  return await EmployeesService.getEmployeesByBirthdayMonth({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { month: args.month }
  })
}
const Organization = {
  organizationalUnits: async (root: { id: number }, _, ctx, info) => {
    return await OrganizationsService.getOrganizationalUnitsByOrganization({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
  },
  manager: getManager,
  contacts: (root) => (root),
  mainPhone: async (root: { id: number }, _, ctx, info) => {
    const response = await OrganizationsService.getPhone({
      unfilteredFields: ['node'],
      source: { id: root.id },
      args: { main: true }
    })
    return response && response.node > 0 ?
      await ContactsService.getContact({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.id }
      }) : null
  },
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const OrganizationsConnection = {
  totalCount: async (_) => {
    return await OrganizationsService.getOrganizationsCount({})
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  organizations: async (root, _, ctx, info) => {
    return await OrganizationsService.getOrganizations({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args && root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args && root.args.search && root.args.search.length > 0 ? root.args.search : null,
      except: null,
      orderBy: ['name']
    })
  }
}
const OrganizationalUnitsConnection = {
  totalCount: async (root) => {
    return await OrganizationsService.getOrganizationalUnitsCount({
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args.search && root.args.search.length > 0 ? root.args.search : null,
      except: null
    })
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  organizationalUnits: async (root, _, ctx, info) => {
    return await OrganizationsService.getOrganizationalUnits({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args.search && root.args.search.length > 0 ? root.args.search : null,
      except: null,
      orderBy: ['name', 'description']
    })
  }
}
const OrganizationalUnit = {
  organization: async (root: { organization: number }, _, ctx, info) => {
    return root && root.organization > 0 ?
      OrganizationsService.getOrganization({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.organization }
      }) : null
  },
  organizationalUnit: async (root: { organizationalUnit: number }, _, ctx, info) => {
    return root && root.organizationalUnit > 0 ?
      await OrganizationsService.getOrganizationalUnit({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.organizationalUnit }
      }) : null
  },
  curator: async (root: { curator: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root && root.curator > 0 ?
      await EmployeesService.getEmployee({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.curator }
      }) : null
  },
  kind: async (root: { kind: number }, _, ctx, info) => {
    return root && root.kind > 0 ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.kind }
      }) : null
  },
  type: async (root: { type: number }, _, ctx, info) => {
    return root && root.type > 0 ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.type }
      }) : null
  },
  manager: async (root: { manager: number }, _, ctx, info) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root && root.manager > 0 ?
      await EmployeesService.getEmployee({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.manager }
      }) : null
  },
  managers: async (root: { id: number }, _, ctx, info) => {
    return EmployeesService.getManagersByOrganizationalUnit({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
  },
  childOrganizationalUnits: async (root: { id: number }, _, ctx, info) => {
    return await OrganizationsService.getChildOrganizationalUnitsByOrganizationalUnit({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
  },
  employees: async (root: { id: number }, _, ctx, info) => {
    return await EmployeesService.getEmployeesByOrganizationalUnit({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
  },
  allEmployees: async (root: { id: number }, _, ctx, info) => {
    return await EmployeesService.getAllEmployeesByOrganizationalUnit({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
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
const OrganizationContactEdge = {
  node: ContactsResolvers.queries.getContact,
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const OrganizationContactsConnection = {
  totalCount: async (root: { id: number, args: { [key: string]: any } }) => {
    return await OrganizationsService.getOrganizationContactsCount({
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args && root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args && root.args.search ? root.args.search : null,
      except: null
    })
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  edges: async (root: { id: number, args: { [key: string]: any } }, _, ctx, info) => {
    return await OrganizationsService.getOrganizationContactsEdges({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { source: root.id },
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
    })
  }
}
const EmployeesConnection = {
  totalCount: async (root: { id: number }) => {
    return root && root.id ?
      await EmployeesService.getEmployeesCount({
        source: { id: root.id }
      }).then((data: { totalCount: number }) => { return data.totalCount }) : null
  },
  edges: async (root: { id: number, args: { [key: string]: any } }, _, ctx, info) => {
    return root && root.id ?
      await EmployeesService.getEmployeesByPerson({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { source: root.id },
        args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      }) : null
  }
}
const PersonEmployeeEdge = {
  node: async (root: { node: number }, _, ctx, info) => {
    return await EmployeesService.getEmployee({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.node }
    })
  }
}
const Employee = {
  person: async (root: { person: number, args: { [key: string]: any } }, _, ctx, info) => {
    return await PersonsService.getPerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.person }
    })
  },
  organization: async (root: { organization: number }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root && root.organization > 0 ?
      await OrganizationsService.getOrganization({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.organization }
      }) : null
  },
  organizationalUnit: async (root: { organizationalUnit: number }, _, ctx, info) => {
    return root && root.organizationalUnit ?
      await OrganizationsService.getOrganizationalUnit({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.organizationalUnit }
      }) : null
  },
  positionalUnit: async (root: { positionalUnit: number }, _, ctx, info) => {
    return root && root.positionalUnit ?
      await OrganizationsService.getPositionalUnit({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.positionalUnit }
      }) : null
  },
  manager: async (root: { manager: number }, _, ctx, info) => {
    return root && root.manager ?
      await EmployeesService.getEmployee({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.manager }
      }) : null
  },
  subordinates: async (root, _, ctx, info) => {
    return await EmployeesService.getSubordinades({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
  },
  subordinatedOrganizationalUnits: async (root: { id: number }, _, ctx, info) => {
    return await OrganizationsService.getSubordinatedOrganizationalUnitsByEmployee({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.id }
    })
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

export default {
  getOrganization,
  Organization,
  OrganizationContactsConnection,
  OrganizationContactEdge,
  OrganizationsConnection,
  getOrganizationalUnit,
  OrganizationalUnitsConnection,
  OrganizationalUnit,
  PositionalUnit,
  getEmployee,
  Employee,
  EmployeesConnection,
  PersonEmployeeEdge,
  getEmployeesByBirthdayMonth
}