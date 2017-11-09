const Node = {
  createdBy: async (root, args, context) => {
    return await context.services.UsersService.getUser(root.createdBy)
  },
  updatedBy: async (root, args, context) => {
    return root.updatedBy ?
      await context.services.UsersService.getUser(root.updatedBy) : null
  },
  deletedBy: async (root, args, context) => {
    return root.deletedBy ?
      await context.services.UsersService.getUser(root.deletedBy) : null
  },
  modifiedBy: async (root, args, context) => {
    return await context.services.UsersService.getUser(root.modifiedBy)
  }
}
export default {
  Node
}