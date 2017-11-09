import { SystemsService } from './../../../services/systems.service'

const createComponent = async (root, data, context) => {
  const _data = {
    componentID: data.componentID,
    name: data.input.name,
    description: data.input.description,
    user: {
      id: context.session.userID
    }
  }
  const response = await SystemsService.createComponent(_data)
  if (response === undefined) return null
  else return Object.assign(response)
}

const updateComponent = async (root, data, context) => {
  const _data = {
    id: data.id,
    typeID: data.input.typeID,
    name: data.input.name,
    description: data.input.description,
    user: {
      id: context.session.userID
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