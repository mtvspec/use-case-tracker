import CommonResolvers from './../common'
import { DictService } from './../../../services/dict.service'
import { SystemsService } from './../../../services/systems.service'

const SystemComponentsConnection = {
  totalCount: async (root: { id: number }) => {
    return await SystemsService.getSystemComponentsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  components: async (root: { id: number }) => {
    return await SystemsService.getSystemComponents(root.id)
  }
}
const ChildComponentsConnection = {
  totalCount: async (root: { id: number }) => {
    return await SystemsService.getChildComponentsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  components: async (root: { id: number }) => {
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
  type: async (root: { type: number }, _, ctx, info) => {
    return root.type ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.type }
      }) : null
  },
  state: CommonResolvers.state,
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const ComponentIssuesConnection = {
  totalCount: async (root: { id: number }) => {
    return await SystemsService.getComponentIssuesEdgesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  edges: async (root: { id: number }) => {
    return await SystemsService.getComponentIssuesEdges(root.id)
  }
}
const System = {
  kind: async (root: { kind: number }, _, ctx, info) => {
    return root.kind ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.kind }
      }) : null
  },
  type: async (root: { type: number }, _, ctx, info) => {
    return root.type ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.type }
      }) : null
  },
  state: CommonResolvers.state,
  systemComponentsConnection: (root) => (root),
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