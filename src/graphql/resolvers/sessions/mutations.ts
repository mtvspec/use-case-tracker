import { SessionsService } from './../../../services'
const closeSession = async (root, args, ctx) => {
  ctx.res.clearCookie('session')
  return await SessionsService.closeSession(ctx.session.id)
}
export default {
  closeSession
}