import { CustomersService } from './../../../services/customers.service'
import CommonResolvers from './../common'
import { OrganizationsService } from './../../../services'

const getCustomerByID = async (root, args, context) => {
  return await CustomersService.getCustomer(args.id)
}

const CustomersConnection = {
  totalCount: async (root, args, context) => {
    return await CustomersService.getCustomersCount()
      .then((data: { totalCount }) => { return data.totalCount })
  },
  customers: async (root, args) => {
    return await CustomersService.getCustomers()
  }
}

const CustomerProjectsConnection = {
  totalCount: async (root, args):
    Promise<{ totalCount }> => {
    return await CustomersService.getCustomersProjectsCount(root.id)
      .then((data: { totalCount }) => { return data.totalCount })
  },
  projects: async (root) => {
    return await CustomersService.getCustomersProjects(root.id)
  }
}

const CustomerProjectEdge = (root, args) => ({ root, args })

const Customer = {
  organization: async (root, args, context) => {
    return root.organizationID ?
      await OrganizationsService.getOrganization(root.organizationID) : null
  },
  projectsConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

export default {
  CustomerProjectsConnection,
  Customer,
  CustomersConnection,
  getCustomerByID
}