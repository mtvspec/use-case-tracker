import UsersResolvers from './../users'
import { UsersService } from './../../../services'
import { SessionsService } from './../../../services'
const getSessionByID = async (root, args, context) => {
  return await SessionsService.getSession(args.id)
}
const Session = {
  user: async (root, args, context, info) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
    return await UsersService.getUser(unfilteredFields, root.userID)
  }
}
export default {
  getSessionByID,
  Session
}