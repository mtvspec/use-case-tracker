import { IssuesService } from './../../../services/issues.service'
import { UsersService } from './../../../services/users.service'
import { ProjectsService } from './../../../services/projects.service'
import { DictService } from './../../../services/dict.service'
import CommonResolvers from './../common'

const getIssueByID = async (root, args) => {
  return await IssuesService.getIssue(args.id)
}

const closedBy = async (root, args, context, info) => {
  const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
  return root.closedBy ?
    await UsersService.getUser(unfilteredFields, root.closedBy) : null
}

const IssuesConnection = {
  totalCount: async (root) => {
    return await IssuesService.getIssuesCount()
      .then((data: { totalCount: number }) => { return data.totalCount })
  },
  issues: async (root) => {
    if (root.args.filter) return await IssuesService.filterIssues(root.args.filter)
    return (root.args.input) ?
      await IssuesService.getIssuesByFieldValue(root.args.input)
      : await IssuesService.getIssues()
  }
}

const Issue = {
  author: async (root) => {
    return root.authorID ?
      await ProjectsService.getProjectMember(root.authorID) : null
  },
  issueType: async (root) => {
    return root.issueTypeID ?
      await DictService.getDictValue(root.issueTypeID) : null
  },
  state: async (root) => {
    return root.stateID ?
      await DictService.getDictValue(root.stateID) : null
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