import { OrganizationsService } from './../../../services'
import { IUser } from '../../../models/person.model'

const createOrganization = async (root: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.createOrganization(data, ctx.session.user))
}

const updateOrganization = async (root: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.updateOrganization(data, ctx.session.user))
}

const deleteOrganization = async (root: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.deleteOrganization(data.id, ctx.session.user))
}

export interface INewOrganizationalUnitData extends IUser {
  organization?: number
  manager?: number
  organizationalUnit?: number
  kind?: number
  type?: number
  name: string
  description?: string
}

const createOrganizationalUnit = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.createOrganizationalUnit(data, ctx.session.user))
}

export interface IUpdatedOrganizationalUnitData extends INewOrganizationalUnitData {
  id: number
}

const updateOrganizationalUnit = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.updateOrganizationalUnit(data, ctx.session.user))
}

export default {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  createOrganizationalUnit,
  updateOrganizationalUnit,
}