import { PersonsService } from './../../../services'

const mutations = {
  createPerson: async (_, data, ctx, info) => {
    return Object.assign(await PersonsService.createPerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      data,
      user: ctx.session.user
    }))
  },
  updatePerson: async (_, data, ctx, info) => {
    return Object.assign(await PersonsService.updatePerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      data,
      user: ctx.session.user
    }))
  },
  deletePerson: async (_, data, ctx, info) => {
    return Object.assign(await PersonsService.deletePerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      id: data.id,
      user: ctx.session.user
    }))
  },
  restoreDeletedPerson: async (_, data, ctx, info) => {
    return Object.assign(await PersonsService.restorePerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      id: data.id,
      user: ctx.session.user
    }))
  }
}

export default mutations