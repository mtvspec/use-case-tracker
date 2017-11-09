import { SessionsService } from './../../../services'
const closeSession = async (root, args, context) => {
  return await SessionsService.closeSession(args.id)
}
export default {
  closeSession
}