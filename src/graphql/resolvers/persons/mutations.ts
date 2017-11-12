import { PersonsService } from './../../../services'

const mutations = {
  createPerson: async (root: any, data: any, ctx: any) => {
    return Object.assign(await PersonsService.createPerson(data, ctx.session.user))
  },
  updatePerson: async (root: any, data: any, ctx: any) => {
    return Object.assign(await PersonsService.updatePerson(data, ctx.session.user))
  },
  deletePerson: async (root: any, data: any, ctx: any) => {
    return Object.assign(await PersonsService.deletePerson(data.id, ctx.session.user))
  },
  restoreDeletedPerson: async (root: any, data: any, ctx: any) => {
    return Object.assign(await PersonsService.restorePerson(data.id, ctx.session.user))
  }
}

export default mutations