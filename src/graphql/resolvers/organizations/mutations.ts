import { OrganizationsService } from './../../../services'
import { User } from '../../../models/user.model';
import { IUser } from '../../../models/person.model';
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

export interface INewOrganizationalUnitData extends IUser {
  organizationID?: number
  managerID?: number
  organizationalUnitID?: number
  kindID?: number
  typeID?: number
  name: string
  description?: string
}

const createOrganizationalUnit = async (_: any, data: any, context: any) => {
  let _data: INewOrganizationalUnitData = {
    organizationID: data.input.organizationID,
    organizationalUnitID: data.input.organizationalUnitID,
    managerID: data.input.managerID,
    kindID: data.input.kindID,
    typeID: data.input.typeID,
    name: data.input.name,
    description: data.input.description,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>OrganizationsService.createOrganizationalUnit(_data)
  if (response.id) {
    return Object.assign(response)
  } else {
    throw Error('An error occured')
  }
}

export interface IUpdatedOrganizationalUnitData extends INewOrganizationalUnitData {
  id: number
}

const updateOrganizationalUnit = async (_: any, data: any, context: any) => {
  let _data: IUpdatedOrganizationalUnitData = {
    id: data.input.id,
    organizationID: data.input.organizationID,
    organizationalUnitID: data.input.organizationalUnitID,
    managerID: data.input.managerID,
    kindID: data.input.kindID,
    typeID: data.input.typeID,
    name: data.input.name,
    description: data.input.description,
    user: {
      id: context.session.userID
    }
  }
  const response = await <any>OrganizationsService.updateOrganizationalUnit(_data)
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
  createOrganizationalUnit,
  updateOrganizationalUnit,
}