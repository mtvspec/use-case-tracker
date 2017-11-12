import CommonResovers from './../common'
import { UsersService } from './../../../services'
import { DictService } from './../../../services'

const parseFields = require('graphql-parse-fields')

const getUserByID = async (root, args, context, info) => {
  const fields = Object.keys(parseFields(info))
  return await UsersService.getUser(fields, args.id)
}

const User = {
  person: CommonResovers.getPersonByUserID,
  state: CommonResovers.state,
  createdBy: CommonResovers.createdBy,
  updatedBy: CommonResovers.updatedBy,
  deletedBy: CommonResovers.deletedBy,
  modifiedBy: CommonResovers.modifiedBy
}

const UsersConnection = {
  totalCount: async (root, args, context) => {
    return await UsersService.getUsersCount()
      .then(data => { return data.totalCount })
  },
  users: async (root, args, context, info) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
    return await UsersService.getAllUsers(unfilteredFields)
  }
}

const UsersResolvers = {
  User,
  UsersConnection,
  getUserByID
}

export default UsersResolvers