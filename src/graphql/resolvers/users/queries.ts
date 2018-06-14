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

const UserRolesConnection = {
  totalCount: async () => {
    return await UsersService.getUsersCount({})
      .then(data => { return data.totalCount })
  },
  edges: async (root: { id: number }, __, ctx, info) => {
    return await UsersService.getUserRolesEdges({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      args: { source: root.id }
    })
  }
}

const getRole = async (root: { node: number }, _, ctx, info) => {
  return await UsersService.getRole({
    unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
    source: { id: root.node }
  })
}

const UserRoleEdge = {
  node: getRole
}

const User = {
  person: CommonResovers.getPersonByUserID,
  roles: (root) => (root),
  state: CommonResovers.state,
  createdBy: CommonResovers.createdBy,
  updatedBy: CommonResovers.updatedBy,
  deletedBy: CommonResovers.deletedBy,
  modifiedBy: CommonResovers.modifiedBy
}

const currentUser = async (_, __, ctx, info) => {
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
  users: async (_, __, ctx, info) => {
    return await UsersService.getAllUsers({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info))
    })
  }
}

const RolesConnection = {
  totalCount: async () => {
    return await UsersService.getUsersCount({})
      .then(data => { return data.totalCount })
  },
  roles: async (_, __, ctx, info) => {
    return await UsersService.getRoles({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info))
    })
  }
}

const UsersResolvers = {
  User,
  UsersConnection,
  getUserByID,
  currentUser,
  RolesConnection,
  UserRolesConnection,
  UserRoleEdge,
}

export default UsersResolvers