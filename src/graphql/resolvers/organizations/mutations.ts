import { OrganizationsService } from './../../../services'

const createOrganization = async (_, data, ctx, info) => {
  return Object.assign(OrganizationsService.createOrganization({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    data,
    user: ctx.session.user
  }))
}
const updateOrganization = async (_, data, ctx, info) => {
  return Object.assign(OrganizationsService.updateOrganization({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    data,
    user: ctx.session.user
  }))
}
const deleteOrganization = async (_, data, ctx, info) => {
  return Object.assign(OrganizationsService.deleteOrganization({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    id: data.id,
    user: ctx.session.user
  }))
}
const createOrganizationalUnit = async (_, data, ctx, info) => {
  return Object.assign(OrganizationsService.createOrganizationalUnit({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    data,
    user: ctx.session.user
  }))
}
const updateOrganizationalUnit = async (_, data, ctx, info) => {
  return Object.assign(OrganizationsService.updateOrganizationalUnit({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    data,
    user: ctx.session.user
  }))
}
const deleteOrganizationalUnit = async (_, data, ctx, info) => {
  return Object.assign(OrganizationsService.deleteOrganizationalUnit({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    id: data.id,
    user: ctx.session.user
  }))
}

export default {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  createOrganizationalUnit,
  updateOrganizationalUnit,
  deleteOrganizationalUnit,
}