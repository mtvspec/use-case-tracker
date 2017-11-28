import UsersResolvers from './../users'
import { UsersService } from './../../../services'
import { SessionsService } from './../../../services'
const getSessionByID = async (root, args, ctx, info) => {
  return await SessionsService.getSession(args.id)
}
const Session = {
  user: async (root: { user: number }, _, ctx, info) => {
    return await UsersService.getUser({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.user }
    })
  }
}
export default {
  getSessionByID,
  Session
}