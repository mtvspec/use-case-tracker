import { SessionsService } from './../../../services'
const closeSession = async (root, args, ctx) => {
  return await SessionsService.closeSession(ctx.session.id)
}
export default {
  closeSession
}