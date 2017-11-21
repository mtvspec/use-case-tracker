import UsersResolvers from './../users'
import { UsersService } from './../../../services'
import { SessionsService } from './../../../services'
const getSessionByID = async (root, args, context) => {
  return await SessionsService.getSession(args.id)
}
const Session = {
  user: async (root, args, ctx, info) => {
    const fields: string[] = Object.keys(ctx.utils.parseFields(info))
    return await UsersService.getUser(fields, root.user)
  }
}
export default {
  getSessionByID,
  Session
}