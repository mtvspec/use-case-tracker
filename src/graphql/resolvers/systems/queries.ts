import CommonResolvers from './../common'
import { DictService } from './../../../services/dict.service'
import { SystemsService } from './../../../services/systems.service'

const SystemComponentsConnection = {
  totalCount: async (root: any) => {
    return await SystemsService.getSystemComponentsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  components: async (root: any) => {
    return await SystemsService.getSystemComponents(root.id)
  }
}
const ChildComponentsConnection = {
  totalCount: async (root: any) => {
    return await SystemsService.getChildComponentsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  components: async (root: any) => {
    return await SystemsService.getChildComponents(root.id)
  }
}
const getSystemByID = async (root: any, args: { id: number }) => {
  return await SystemsService.getSystemByID(args.id)
}
const getComponentByID = async (root: any, args: { id: number }) => {
  return await SystemsService.getComponentByID(args.id)
}
const ComponentIssueEdge = {
  node: async (root: { id: number }) => {
    return await SystemsService.getComponentIssue(root.id)
  }
}
const Component = {
  component: async (root: { id: number, component: number }) => {
    return root.component ?
      await SystemsService.getParentComponent(root.id) : null
  },
  issuesConnection: (root: any) => (root),
  childComponentsConnection: (root: any) => (root),
  type: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.type ?
      await DictService.getDictValue(fields, root.typeID) : null
  },
  state: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return DictService.getDictValue(fields, root.stateID)
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const ComponentIssuesConnection = {
  totalCount: async (root: any) => {
    return await SystemsService.getComponentIssuesEdgesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  edges: async (root: any) => {
    return await SystemsService.getComponentIssuesEdges(root.id)
  }
}
const System = {
  kind: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.kindID ?
      await DictService.getDictValue(fields, root.kindID) : null
  },
  type: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.typeID ?
      await DictService.getDictValue(fields, root.typeID) : null
  },
  state: CommonResolvers.state,
  systemComponentsConnection: (root: any) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
export default {
  Component,
  ChildComponentsConnection,
  System,
  SystemComponentsConnection,
  getSystemByID,
  getComponentByID,
  ComponentIssuesConnection,
  ComponentIssueEdge
}