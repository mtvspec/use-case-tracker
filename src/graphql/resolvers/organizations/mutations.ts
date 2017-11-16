import { OrganizationsService } from './../../../services'

const createOrganization = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.createOrganization(data, ctx.session.user))
}
const updateOrganization = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.updateOrganization(data, ctx.session.user))
}
const deleteOrganization = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.deleteOrganization(data.id, ctx.session.user))
}
const createOrganizationalUnit = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.createOrganizationalUnit(data, ctx.session.user))
}
const updateOrganizationalUnit = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.updateOrganizationalUnit(data, ctx.session.user))
}
const deleteOrganizationalUnit = async (_: any, data: any, ctx: any) => {
  return Object.assign(OrganizationsService.deleteOrganizationalUnit(data.id, ctx.session.user))
}

export default {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  createOrganizationalUnit,
  updateOrganizationalUnit,
  deleteOrganizationalUnit,
}