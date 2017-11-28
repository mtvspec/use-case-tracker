import CommonResovers from './../common'
import { UsersService } from './../../../services'

const getUserByID = async (_, args: { id: number }, ctx, info) => {
  return await UsersService.getUser({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: args.id },
    except: { id: 0 }
  })
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
    return await UsersService.getUsersCount({
      except: { id: 0 }
    }).then(data => { return data.totalCount })
  },
  users: async (root: any, args: any, ctx: any, info: any) => {
    return await UsersService.getAllUsers({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info))
    })
  }
}

const UsersResolvers = {
  User,
  UsersConnection,
  getUserByID
}

export default UsersResolvers