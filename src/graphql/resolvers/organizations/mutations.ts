import { OrganizationsService } from './../../../services'
const createOrganization = async (root, data, context) => {
  if (!data.input) throw Error('Input is required')
  let _data = {
    bin: data.input.bin,
    name: data.input.name,
    officialName: data.input.officialName,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>OrganizationsService.createOrganization(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

const updateOrganization = async (root, data, context) => {
  if (!data.id && data.input) throw Error('Input is required')
  let _data = {
    id: data.id,
    bin: data.input.bin,
    name: data.input.name,
    officialName: data.input.officialName,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>OrganizationsService.updateOrganization(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

const deleteOrganization = async (root, data, context) => {
  if (!data.id) throw Error('Input is required')
  let _data = {
    id: data.id,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>OrganizationsService.deleteOrganization(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

export default {
  createOrganization,
  updateOrganization,
  deleteOrganization,
}