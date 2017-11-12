import CommonResolvers from './../common'
import { DictService } from './../../../services'
import { ContactsService } from './../../../services'

const Contact = {
  contactType: async (root: { contactType: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await DictService.getDictValue(fields, root.contactType)
  },
  contact: (root: { contact: any | number }) => {
    if (root.contact) { return root.contact }
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const getContact = async (root: { node: number }, args: any, ctx: any, info: any) => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
  return await ContactsService.getContact(fields, root.node)
}

const queries = {
  Contact,
  getContact
}

export default queries