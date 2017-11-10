import CommonResolvers from './../common'
import { OrganizationsService } from './../../../services/organizations.service'
import { EmployeesService } from './../../../services/employees.service'
import { PersonsService } from './../../../services/persons.service'
const getOrganizationalUnitByID = async (root: any, args: any) => {
  return await OrganizationsService.getOrganizationalUnitByID(args.id)
}

const getOrganizationByID = async (root: any, args: any) => {
  return await OrganizationsService.getOrganization(args.id)
}

const getManagerByID = async (root: any) => {
  return root.managerID ?
    await EmployeesService.getEmployee(root.managerID) : null
}

const Organization = {
  organizationalUnits: async (root: any) => {
    return await OrganizationsService.getOrganizationalUnits(root.id)
  },
  manager: getManagerByID,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const OrganizationsConnection = {
  totalCount: async (root: any) => {
    return await OrganizationsService.getOrganizationsCount()
      .then((data: any) => { return data.totalCount })
  },
  organizations: async (root: any) => {
    return await OrganizationsService.getOrganizations()
  }
}

const OrganizationalUnit = {
  manager: async (root: any) => {
    return root.managerID > 0 ?
      await OrganizationsService.getManagerByID(root.managerID) : null
  },
  managers: async (root: any) => {
    return OrganizationsService.getManagersByOrganizationalUnitID(root.id)
  },
  childOrganizationalUnits: async (root: any) => {
    return await OrganizationsService.getChildOrganizationalUnitsByOrganizationalUnitID(root.id)
  },
  employees: async (root: any) => {
    return await OrganizationsService.getEmployeesByOrganizationalUnitID(root.id)
  },
  allEmployees: async (root: any) => {
    return await OrganizationsService.getAllEmployeesByOrganizationalUnitID(root.id)
  },
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
  totalCount: async (root: any) => {
    return root.id ?
      await EmployeesService.getEmployeesCount(root.id)
        .then((data: any) => { return data.totalCount }) : null
  },
  edges: async (root: any) => {
    return root.id ?
      await EmployeesService.getEmployeesByPersonID(root.id) : null
  }
}

const PersonEmployeeEdge = {
  node: async (root: any) => {
    return await EmployeesService.getEmployee(root.empID)
  }
}

const Employee = {
  person: async (root: any, args: any, context: any, info: any) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection.name.value)
    return await PersonsService.getPerson(unfilteredFields, root.personID)
  },
  organizationalUnit: async (root: any) => {
    return root.organizationalUnitID ?
      await OrganizationsService.getOrganizationalUnitByID(root.organizationalUnitID) : null
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
  getOrganizationalUnitByID,
  getOrganizationByID,
  OrganizationalUnit,
  PositionalUnit,
  EmployeesConnection,
  PersonEmployeeEdge,
  Employee,
}