import { ContactsService } from './../../../services'

const mutations = {
  createContact: async (root: any, data: any, ctx: any) => {
    return Object.assign(await ContactsService.createContact(data, ctx.session.user))
  },
  updateContact: async (root: any, data: any, ctx: any) => {
    return Object.assign(await ContactsService.updateContact(data, ctx.session.user))
  },
  deleteContact: async (root: any, data: any, ctx: any) => {
    return Object.assign(await ContactsService.deleteContact(data.id, ctx.session.user))
  }
}

export default mutations