import CommonResolvers from './../common'
import ContactsResolvers from './../contacts'
import { PersonsService } from './../../../services'
import { ContactsService } from './../../../services'
import { ProjectsService } from './../../../services'
import { DictService } from './../../../services'
import { CustomersService } from './../../../services'

class PersonsQueriesResolver {
  public static getPerson = async (_: any, args: any, ctx: any, info: any) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPerson(fields, args.id, args)
  }
  public static getPersons = async (root: any, _: any, ctx: any, info: any) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    const orderBy = ['lastName', 'firstName', 'middleName']
    if (root && root.args && (root.args.search && (root.args.search.length > 0 || root.args.search === ''))) return await PersonsService.searchPersons(fields, root.args.search, root.args, orderBy)
    else if (root && root.args && (root.args.isDeleted === true || root.args.isDeleted === false)) return await PersonsService.filterPersons(fields, root.args, orderBy)
    else return await PersonsService.getPersons(
      fields,
      null,
      { isDeleted: false },
      null,
      orderBy
    )
  }
  public static getPersonsTotalCount = async (root: any) => {
    PersonsService.getPersonsCount(null, root.args, null, root.args.search ? root.args.search : null)
      .then((data: { totalCount: number }) => {
        return data.totalCount
      })
  }
}
const getMobilePhone = async (root: { id: number }, _: any, ctx: any, info: any):
  Promise<any | null> => {
  const mobilePhone: any = await PersonsService.getPhone(['node'], root.id, { isMainMobilePhone: true })
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return mobilePhone && mobilePhone.node > 0 ?
    await ContactsService.getContact(fields, mobilePhone.node) as any : null
}
const getInternalPhone = async (root: { id: number }, _: any, ctx: any, info: any):
  Promise<any | null> => {
  const internalPhone: any = await PersonsService.getPhone(['node'], root.id, { isMainInternalPhone: true })
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return internalPhone && internalPhone.node > 0 ?
    await ContactsService.getContact(fields, internalPhone.node) as any : null
}
const getWorkPhone = async (root: { id: number }, _: any, ctx: any, info: any):
  Promise<any | null> => {
  const workPhone: any = await PersonsService.getPhone(['node'], root.id, { isMainWorkPhone: true })
  const fields: string[] = Object.keys(ctx.utils.parseFields(info))
  return workPhone && workPhone.node > 0 ?
    await ContactsService.getContact(fields, workPhone.node) as any : null
}
const Person = {
  // TODO: Redesign to one boolean value main contact (type + main: true | false)
  internalPhone: getInternalPhone,
  workPhone: getWorkPhone,
  mobilePhone: getMobilePhone,
  contacts: (root: any) => (root),
  employee: (root: any) => (root.id ? root : null),
  customers: async (root: { id: number }) => {
    return await CustomersService.getCustomersByPersonID(root.id)
  },
  projectMember: async (root: { id: number }) => {
    return await ProjectsService.getProjectMembersByPersonID(root.id)
  },
  gender: async (root: { gender: number }, _: any, ctx: any, info: any) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return root.gender > 0 ?
      await DictService.getDictValue(fields, root.gender) : null
  },
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy,
}
const PersonsConnection = {
  totalCount: async (root: any) => {
    return await PersonsService.getPersonsCount(null, Object.keys(root.args).length > 0 ? root.args : { isDeleted: false }, null, root.args.search ? root.args.search : null)
      .then((data: { totalCount: number }) => {
        return data.totalCount
      })
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
  totalCount: async (root: { id: number }) => {
    return await PersonsService.getPersonContactsCount(root.id)
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  edges: async (root: { id: number }, args: any, ctx: any, info: any) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPersonContactsEdges(fields, root.id, args)
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