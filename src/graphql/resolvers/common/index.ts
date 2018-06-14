import { UsersService } from './../../../services'
import { PersonsService } from './../../../services'
import { DictService } from './../../../services'

const createdBy = async (root: { createdBy: number }, _, ctx, info) => {
  return await UsersService.getUser({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: root.createdBy }
  })
}
const updatedBy = async (root: { updatedBy: number }, _, ctx, info) => {
  return root.updatedBy > 0 ?
    await UsersService.getUser({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.updatedBy }
    }) : null
}
const deletedBy = async (root: { deletedBy: number }, _, ctx, info) => {
  return root.deletedBy > 0 ?
    await UsersService.getUser({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.deletedBy }
    }) : null
}
const modifiedBy = async (root: { modifiedBy: number }, _, ctx, info) => {
  return await UsersService.getUser({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: root.modifiedBy }
  })
}
const state = async (root: { state: number }, _, ctx, info) => {
  return await DictService.getDictValue({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: root.state }
  })
}
const getPersonByUserID = async (root: { person: number }, _, ctx, info) => {
  return await PersonsService.getPerson({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: root.person }
  })
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