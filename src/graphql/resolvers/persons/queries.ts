import CommonResolvers from './../common'
import { PersonsService } from './../../../services'
import { ProjectsService } from './../../../services'
import { DictService } from './../../../services'
import { CustomersService } from './../../../services'
import { UsersService } from './../../../services'

class PersonsQueriesResolver {
  private personsFields = []
  public static getPersonByID = async (root, args, context, info) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
    return await PersonsService.getPerson(unfilteredFields, args.id)
  }
  public static getPersons = async (root, args, context, info) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
    if (root && root.args && (root.args.isDeleted === true || root.args.isDeleted === false)) return await PersonsService.getPersonsByRecordState(unfilteredFields, root.args.isDeleted)
    else if (root && root.args && (root.args.search.length > 0 || root.args.search === '')) return await PersonsService.searchPersons(unfilteredFields, root.args.search)
    else return await PersonsService.getPersons(unfilteredFields)
  }
  public static getPersonsTotalCount = async (root, args) => {
    if (root && root.args && (root.args.isDeleted === true || root.args.isDeleted === false)) return await PersonsService.getPersonsCountByRecordState(root.args.isDeleted)
      .then(data => { return data.totalCount })
    else return await PersonsService.getPersonsCount()
      .then(data => { return data.totalCount })
  }
}

const getMainMobileContactByID = async (root) => {
  return root.mainMobileContactID ?
    await PersonsService.getContact(root.mainMobileContactID) : null
}

const getInternalPhone = async (root) => {
  return root.internalPhoneID ?
    await PersonsService.getContact(root.internalPhoneID) : null
}

const getWorkPhone = async (root) => {
  console.log(root)
  return root.workPhoneID ?
    await PersonsService.getContact(root.workPhoneID) : null
}

const Person = {
  internalPhone: getInternalPhone,
  workPhone: getWorkPhone,
  mainMobileContact: getMainMobileContactByID,
  contacts: (root) => (root),
  employee: (root) => (root.id ? root : null),
  customers: async (root) => {
    return await CustomersService.getCustomersByPersonID(root.id)
  },
  projectMember: async (root) => {
    return await ProjectsService.getProjectMembersByPersonID(root.id)
  },
  gender: async (root) => {
    return root.genderID > 0 ?
      await DictService.getDictValue(root.genderID) : null
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const PersonsConnection = {
  totalCount: PersonsQueriesResolver.getPersonsTotalCount,
  persons: PersonsQueriesResolver.getPersons
}

const Contact = {
  contactType: async (root) => {
    return await DictService.getDictValue(root.contactTypeID)
  },
  contact: (root) => {
    if (root.contact) { return root.contact }
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ContactsConnection = {
  totalCount: async (root) => {
    return await PersonsService.getPersonsContactsCount(root.id)
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  contacts: async (root) => {
    return await PersonsService.getContacts(root.id)
  }
}

export default {
  Person,
  PersonsQueriesResolver,
  PersonsConnection,
  getPersonByUserID: CommonResolvers.getPersonByUserID,
  ContactsConnection,
  Contact
}