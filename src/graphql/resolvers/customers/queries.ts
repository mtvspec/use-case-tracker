import CommonResolvers from './../common'
import { CustomersService } from './../../../services/customers.service'
import { OrganizationsService } from './../../../services'

const getCustomerByID = async (_, args: { id: number }) => {
  return await CustomersService.getCustomer(args.id)
}

const CustomersConnection = {
  totalCount: async () => {
    return await CustomersService.getCustomersCount()
      .then((data: any) => { return data.totalCount })
  },
  customers: async () => {
    return await CustomersService.getCustomers()
  }
}

const CustomerProjectsConnection = {
  totalCount: async (root: { id: number }, _) => {
    return await CustomersService.getCustomersProjectsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  projects: async (root: { id: number }) => {
    return await CustomersService.getCustomersProjects(root.id)
  }
}

const CustomerProjectEdge = (root, args) => ({ root, args })

const Customer = {
  organization: async (root: { organization: number }, _, ctx, info) => {
    return root.organization ?
      await OrganizationsService.getOrganization({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.organization }
      }) : null
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