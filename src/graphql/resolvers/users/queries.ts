import CommonResovers from './../common'
import { UsersService } from './../../../services'

const getUserByID = async (root: any, args: { id: any }, ctx: any, info: any) => {
  const fields: any = Object.keys(ctx.utils.parseFields(info))
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
  totalCount: async () => {
    return await UsersService.getUsersCount()
      .then(data => { return data.totalCount })
  },
  users: async (root: any, args: any, ctx: any, info: any) => {
    const fields = Object.keys(ctx.utils.parseFields(info))
    return await UsersService.getAllUsers(fields)
  }
}

const UsersResolvers = {
  User,
  UsersConnection,
  getUserByID
}

export default UsersResolvers