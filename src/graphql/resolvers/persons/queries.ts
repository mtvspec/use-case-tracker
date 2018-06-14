import CommonResolvers from './../common'
import ContactsResolvers from './../contacts'
import { PersonsService } from './../../../services'
import { ContactsService } from './../../../services'
import { ProjectsService } from './../../../services'
import { DictService } from './../../../services'
import { CustomersService } from './../../../services'

class PersonsQueriesResolver {
  public static getPerson = async (_, args: { [key: string]: any }, ctx, info) => {
    return await PersonsService.getPerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: args.id },
      args: args && Object.keys(args).length > 0 ? args : null,
      filter: args.filter && Object.keys(args.filter).length > 0 ? args.filter : null,
      except: null
    })
  }
  public static getPersons = async (root, _, ctx, info) => {
    return await PersonsService.getPersons({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args.search && root.args.search.length > 0 ? root.args.search : null,
      except: null,
      orderBy: ['lastName', 'firstName', 'middleName']
    })
  }
  public static getPersonsTotalCount = async (root) => {
    PersonsService.getPersonsCount({
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args.search ? root.args.search : null,
      except: null
    })
      .then((data: { totalCount: number }) => { return data.totalCount })
  }
}
const getMobilePhone = async (root: { id: number }, _, ctx, info) => {
  const response = await PersonsService.getPhone({
    unfilteredFields: ['node'],
    source: { source: root.id },
    args: { isMainMobilePhone: true }
  })
  return response && response.node > 0 ?
    await ContactsService.getContact({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: response.node }
    }) : null
}
const getInternalPhone = async (root: { id: number }, _, ctx, info) => {
  const response = await PersonsService.getPhone({
    unfilteredFields: ['node'],
    source: { source: root.id },
    args: { isMainInternalPhone: true }
  })
  return response && response.node > 0 ?
    await ContactsService.getContact({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: response.node }
    }) : null
}
const getWorkPhone = async (root: { id: number }, _, ctx, info) => {
  const response = await PersonsService.getPhone({
    unfilteredFields: ['node'],
    source: { source: root.id },
    args: { isMainWorkPhone: true }
  })
  const fields: string[] = Object.keys(ctx.utils.parseFields(info))
  return response && response.node > 0 ?
    await ContactsService.getContact({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: response.node }
    }) : null
}
const Person = {
  internalPhone: getInternalPhone,
  workPhone: getWorkPhone,
  mobilePhone: getMobilePhone,
  contacts: (root) => (root),
  employee: (root) => (root.id ? root : null),
  customers: async (root: { id: number }) => {
    return await CustomersService.getCustomersByPersonID(root.id)
  },
  projectMember: async (root: { id: number }) => {
    return await ProjectsService.getProjectMembersByPersonID(root.id)
  },
  gender: async (root: { gender: number }, _, ctx, info) => {
    return root.gender > 0 ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.gender }
      }) : null
  },
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy,
}
const PersonsConnection = {
  totalCount: async (root) => {
    return await PersonsService.getPersonsCount({
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      filter: root.args.filter && Object.keys(root.args.filter).length > 0 ? root.args.filter : null,
      search: root.args.search ? root.args.search : null,
      except: null
    })
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  persons: PersonsQueriesResolver.getPersons
}
const PersonContactEdge = {
  node: ContactsResolvers.queries.getContact,
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const PersonContactsConnection = {
  totalCount: async (root: { id: number, args: { [key: string]: any } }) => {
    return await PersonsService.getPersonContactsCount({
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
      source: { source: root.id },
      except: null
    }).then((data: { totalCount: number }) => { return data.totalCount })
  },
  edges: async (root: { id: number, args: { [key: string]: any } }, _, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPersonContactsEdges({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { source: root.id },
      args: root.args && Object.keys(root.args).length > 0 ? root.args : null,
    })
  }
}

export default {
  Person,
  PersonsQueriesResolver,
  PersonsConnection,
  getPersonByUserID: CommonResolvers.getPersonByUserID,
  PersonContactsConnection,
  PersonContactEdge
}