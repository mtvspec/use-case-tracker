import { IssuesService } from './../../../services/issues.service'
import { UsersService } from './../../../services/users.service'
import { ProjectsService } from './../../../services/projects.service'
import { DictService } from './../../../services/dict.service'
import CommonResolvers from './../common'

const getIssueByID = async (_, args: { id: number }) => {
  return await IssuesService.getIssue(args.id)
}

const closedBy = async (root: { closedBy: number }, _, ctx, info) => {
  return root.closedBy ?
    await UsersService.getUser({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.closedBy }
    }) : null
}

const IssuesConnection = {
  totalCount: async (root: any) => {
    return await IssuesService.getIssuesCount()
      .then((data: any) => { return data.totalCount })
  },
  issues: async (root: any) => {
    if (root.args.filter) return await IssuesService.filterIssues(root.args.filter)
    return (root.args.input) ?
      await IssuesService.getIssuesByFieldValue(root.args.input)
      : await IssuesService.getIssues()
  }
}

const Issue = {
  author: async (root: { author: number }) => {
    return root.author ?
      await ProjectsService.getProjectMember(root.author) : null
  },
  issueType: async (root: { type: number }, _, ctx, info) => {
    return root.type ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.type }
      }) : null
  },
  state: async (root: { state: number }, _, ctx, info) => {
    return root.state ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.state }
      }) : null
  },
  closedBy: closedBy,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
export default {
  getIssueByID,
  IssuesConnection,
  Issue,
}