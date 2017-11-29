import CommonResovers from './../common'
import { UsersService } from './../../../services'
import { SessionsService } from '../../../services/sessions.service/index';

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

const currentUser = async (_, __, ctx, info) => {
  console.log(ctx.session)
  if (ctx.session.user > 0)
    return await UsersService.getUser({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: ctx.session.user },
      except: { id: 0 }
    })
  else {
    ctx.res.status(401)
    return null;
  }
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
  getUserByID,
  currentUser
}

export default UsersResolvers