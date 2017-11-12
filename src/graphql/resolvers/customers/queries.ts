import CommonResolvers from './../common'
import { CustomersService } from './../../../services/customers.service'
import { OrganizationsService } from './../../../services'

const getCustomerByID = async (_: any, args: { id: number }) => {
  return await CustomersService.getCustomer(args.id)
}

const CustomersConnection = {
  totalCount: async (root: any) => {
    return await CustomersService.getCustomersCount()
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  customers: async (root: any) => {
    return await CustomersService.getCustomers()
  }
}

const CustomerProjectsConnection = {
  totalCount: async (root: { id: number }, _: any):
    Promise<number> => {
    return await CustomersService.getCustomersProjectsCount(root.id)
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  projects: async (root: { id: number }) => {
    return await CustomersService.getCustomersProjects(root.id)
  }
}

const CustomerProjectEdge = (root: any, args: any) => ({ root, args })

const Customer = {
  organization: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.organization ?
      await OrganizationsService.getOrganization(fields, root.organization) : null
  },
  projectsConnection: (root: any) => (root),
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