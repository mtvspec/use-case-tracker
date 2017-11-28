import { SystemsService } from './../../../services/systems.service'

const createComponent = async (root, data, ctx) => {
  const _data = {
    component: data.component,
    name: data.input.name,
    description: data.input.description,
    user: {
      id: ctx.session.user
    }
  }
  const response = await SystemsService.createComponent(_data)
  if (response === undefined) return null
  else return Object.assign(response)
}

const updateComponent = async (root, data, ctx) => {
  const _data = {
    id: data.id,
    type: data.input.type,
    name: data.input.name,
    description: data.input.description,
    user: {
      id: ctx.session.user
    }
  }
  const response = await SystemsService.updateComponent(_data)
  if (response === undefined) return null
  else return Object.assign(response)
}
export default {
  createComponent,
  updateComponent
}