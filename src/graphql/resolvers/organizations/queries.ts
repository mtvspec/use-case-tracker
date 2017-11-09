import CommonResolvers from './../common'
import { OrganizationsService } from './../../../services/organizations.service'
import { EmployeesService } from './../../../services/employees.service'
import { PersonsService } from './../../../services/persons.service'
const getOrganizationalUnitByID = async (root, args) => {
  return await OrganizationsService.getOrganizationalUnitByID(args.id)
}

const getOrganizationByID = async (root, args) => {
  return await OrganizationsService.getOrganization(args.id)
}

const Organization = {
  organizationalUnit: async (root) => {
    return root.organizationalUnitID ?
      await OrganizationsService.getOrganizationalUnitByOrganizationID(root.organizationalUnitID) : null
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const OrganizationsConnection = {
  totalCount: async (root) => {
    return await OrganizationsService.getOrganizationsCount()
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  organizations: async (root) => {
    return await OrganizationsService.getOrganizations()
  }
}

const OrganizationalUnit = {
  manager: async (root) => {
    return root.managerID > 0 ?
      await OrganizationsService.getManagerByID(root.managerID) : null
  },
  managers: async (root) => {
    return OrganizationsService.getManagersByOrganizationalUnitID(root.id)
  },
  childOrganizationalUnits: async (root) => {
    return await OrganizationsService.getChildOrganizationalUnitsByOrganizationalUnitID(root.id)
  },
  employees: async (root) => {
    return await OrganizationsService.getEmployeesByOrganizationalUnitID(root.id)
  },
  allEmployees: async (root) => {
    return await OrganizationsService.getAllEmployeesByOrganizationalUnitID(root.id)
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const PositionalUnit = {
  organizationalUnit: async (root) => {
    return root.organizationalUnitID ?
      await OrganizationsService.getOrganizationalUnitByID(root.organizationalUnitID) : null
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const EmployeesConnection = {
  totalCount: async (root) => {
    return root.id ?
      await EmployeesService.getEmployeesCount(root.id)
        .then((data: { totalCount: number }) => { return data.totalCount }) : null
  },
  edges: async (root) => {
    return root.id ?
      await EmployeesService.getEmployeesByPersonID(root.id) : null
  }
}

const PersonEmployeeEdge = {
  node: async (root) => {
    return await EmployeesService.getEmployee(root.empID)
  }
}

const Employee = {
  person: async (root, args, context, info) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
    return await PersonsService.getPerson(unfilteredFields, root.personID)
  },
  organizationalUnit: async (root) => {
    return root.organizationalUnitID ?
      await OrganizationsService.getOrganizationalUnitByID(root.organizationalUnitID) : null
  },
  positionalUnit: async (root) => {
    return root.positionalUnitID ?
      await OrganizationsService.getPositionalUnitByEmployeeID(root.id) : null
  },
  manager: async (root) => {
    return root.managerID ?
      await EmployeesService.getEmployee(root.managerID) : null
  },
  subordinates: async (root) => {
    return await OrganizationsService.getSubordinadedOrganizationalUnitsManagersByOrganizationalUnitID(root.organizationalUnitID)
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