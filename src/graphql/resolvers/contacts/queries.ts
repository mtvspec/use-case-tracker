import CommonResolvers from './../common'
import { DictService } from './../../../services'
import { ContactsService } from './../../../services'

const Contact = {
  contactType: async (root: { contactType: number }, _, ctx, info) => {
    return await DictService.getDictValue({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.contactType }
    })
  },
  contact: (root: { contact: any | number }) => {
    if (root.contact) { return root.contact }
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const getContact = async (root: { node: number }, _, ctx, info) => {
  return await ContactsService.getContact({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: root.node }
  })
}
const queries = {
  Contact,
  getContact
}

export default queries