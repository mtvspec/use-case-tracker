import CommonResolvers from './../common'
import ContactsResolvers from './../contacts'
import { PersonsService } from './../../../services'
import { ContactsService } from './../../../services'
import { ProjectsService } from './../../../services'
import { DictService } from './../../../services'
import { CustomersService } from './../../../services'
import { UsersService } from './../../../services'
import { field } from '../../../utils/index'

interface Entity {
  id: number
  state: DictValue
  isDeleted: boolean
  createdBy: User
  createdAt: Date
  updatedBy?: User
  updatedAt?: Date
  deletedBy?: User
  deletedAt?: Date
  modifiedBy: User
  modifiedAt: Date
}

interface User extends Entity {
  person: Person
  username: string
}

interface Contact extends Entity {
  contact: string
}

interface ContactsConnection {
  totalCount: number
  contacts: Contact[]
}

interface Employee extends Entity {
  salary: number
}

interface Customer extends Entity {
  name: string
  description: string
}

interface DictValue extends Entity {
  nameRu: string
}

interface Person extends Entity {
  internalPhone: Contact
  workPhone: Contact
  mainMobileContact: Contact
  employee: Employee[]
  contacts: ContactsConnection
  customers: Customer[]
  projectMember: Employee
  gender: DictValue
}

class PersonsQueriesResolver {
  public static getPerson = async (root: any, args: { id: number }, ctx: any, info: any) => {
    const fields: any[] = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPerson(fields, args.id)
  }
  public static getPersons = async (root: any, args: any, ctx: any, info: any) => {
    const fields: any[] = Object.keys(ctx.utils.parseFields(info))
    if (root && root.args && (root.args.isDeleted === true || root.args.isDeleted === false)) return await PersonsService.filterPersons(fields, root.args)
    else if (root && root.args && (root.args.search && (root.args.search.length > 0 || root.args.search === ''))) return await PersonsService.searchPersons(fields, root.args.search, root.args)
    else return await PersonsService.getPersons(fields)
  }
  public static getPersonsTotalCount = async (root: any) => {
    if (root && root.args && (root.args.isDeleted === true || root.args.isDeleted === false)) return await PersonsService.getPersonsCountByArgs(root.args)
      .then(data => { return data.totalCount })
    else return await PersonsService.getPersonsCount()
      .then(data => { return data.totalCount })
  }
}

const getMobilePhone = async (root: { mobilePhone: number }, _: any, ctx: any, info: any):
  Promise<Contact | null> => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return root.mobilePhone > 0 ?
    await ContactsService.getContact(fields, root.mobilePhone) as Contact : null
}

const getInternalPhone = async (root: { internalPhone: number }, _: any, ctx: any, info: any):
  Promise<Contact | null> => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return root.internalPhone > 0 ?
    await ContactsService.getContact(fields, root.internalPhone) as Contact : null
}

const getWorkPhone = async (root: { workPhone: number }, _: any, ctx: any, info: any):
  Promise<Contact | null> => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return root.workPhone > 0 ?
    await ContactsService.getContact(fields, root.workPhone) as Contact : null
}

const Person = {
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
  gender: async (root: { gender: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
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
  totalCount: PersonsQueriesResolver.getPersonsTotalCount,
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
    return await PersonsService.getPersonsContactsCount(root.id)
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  edges: async (root: { id: number }, args: any, ctx: any, info: any) => {
    const fields: any[] = Object.keys(ctx.utils.parseFields(info))
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