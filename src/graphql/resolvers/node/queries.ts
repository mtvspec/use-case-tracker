const Node = {
  createdBy: async (root: any, args: any, ctx: any) => {
    return await ctx.services.UsersService.getUser(root.createdBy)
  },
  updatedBy: async (root: any, args: any, ctx: any) => {
    return root.updatedBy ?
      await ctx.services.UsersService.getUser(root.updatedBy) : null
  },
  deletedBy: async (root: any, args: any, ctx: any) => {
    return root.deletedBy ?
      await ctx.services.UsersService.getUser(root.deletedBy) : null
  },
  modifiedBy: async (root: any, args: any, ctx: any) => {
    return await ctx.services.UsersService.getUser(root.modifiedBy)
  }
}
export default {
  Node
}