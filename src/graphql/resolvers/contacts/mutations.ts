import { ContactsService } from './../../../services'

const mutations = {
  createPersonContact: async (root, data, ctx, info) => {
    return Object.assign(await ContactsService.createContact({
      unfilteredFields: ctx.utils.parseFields(info),
      data,
      user: ctx.session.user
    }))
  },
  updatePersonContact: async (_, data, ctx, info) => {
    return Object.assign(await ContactsService.updateContact({
      unfilteredFields: ctx.utils.parseFields(info),
      data,
      user: ctx.session.user
    }))
  },
  deleteContact: async (_, data, ctx, info) => {
    return Object.assign(await ContactsService.deleteContact({
      unfilteredFields: ctx.utils.parseFields(info),
      id: data.id,
      user: ctx.session.user
    }))
  }
}

export default mutations