import { UsersService } from './../../../services'
import { PersonsService } from './../../../services'
import { DictService } from './../../../services'
const createdBy = async (root: { createdBy: number }, args: any, ctx: any, info: any) => {
  const fields = Object.keys(ctx.utils.parseFields(info))
  return await UsersService.getUser(fields, { id: root.createdBy })
}
const updatedBy = async (root: { updatedBy: number }, args: any, ctx: any, info: any) => {
  const fields = Object.keys(ctx.utils.parseFields(info))
  return root.updatedBy > 0 ?
    await UsersService.getUser(fields, { id: root.updatedBy }) : null
}
const deletedBy = async (root: { deletedBy: number }, args: any, ctx: any, info: any) => {
  const fields = Object.keys(ctx.utils.parseFields(info))
  return root.deletedBy > 0 ?
    await UsersService.getUser(fields, { id: root.deletedBy }) : null
}
const modifiedBy = async (root: { modifiedBy: number }, args: any, ctx: any, info: any) => {
  const fields = Object.keys(ctx.utils.parseFields(info))
  return await UsersService.getUser(fields, { id: root.modifiedBy })
}
const state = async (root: { state: number }, args: any, ctx: any, info: any) => {
  const fields: any[] = Object.keys(ctx.utils.parseFields(info))
  return await DictService.getDictValue(fields, { id: root.state })
}
const getPersonByUserID = async (root: { person: number }, args: any, ctx: any, info: any) => {
  const fields: any[] = Object.keys(ctx.utils.parseFields(info))
  return await PersonsService.getPerson(fields, { id: root.person })
}
const CommonResolvers = {
  state,
  createdBy,
  updatedBy,
  deletedBy,
  modifiedBy,
  getPersonByUserID
}
export default CommonResolvers