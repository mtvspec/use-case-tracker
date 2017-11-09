import { UsersService } from './../../../services'
import { PersonsService } from './../../../services'
const createdBy = async (root, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return await UsersService.getUser(unfilteredFields, root.createdBy)
}
const updatedBy = async (root, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return root.updatedBy > 0 ?
    await UsersService.getUser(unfilteredFields, root.updatedBy) : null
}
const deletedBy = async (root, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return root.deletedBy > 0 ?
    await UsersService.getUser(unfilteredFields, root.deletedBy) : null
}
const modifiedBy = async (root, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return await UsersService.getUser(unfilteredFields, root.modifiedBy)
}

const getPersonByUserID = async (root, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return await PersonsService.getPerson(unfilteredFields, root.personID)
}

const CommonResolvers = {
  createdBy,
  updatedBy,
  deletedBy,
  modifiedBy,
  getPersonByUserID
}

export default CommonResolvers