import { ContactsService } from './../../../services'

const mutations = {
  createPersonContact: async (root: any, data: any, ctx: any) => {
    return Object.assign(await ContactsService.createContact(data, ctx.session.user))
  },
  updatePersonContact: async (root: any, data: any, ctx: any) => {
    return Object.assign(await ContactsService.updateContact(data, ctx.session.user))
  },
  deleteContact: async (root: any, data: any, ctx: any) => {
    return Object.assign(await ContactsService.deleteContact(data.id, ctx.session.user))
  }
}

export default mutations