import CommonResolvers from './../common'
import { DictService } from './../../../services/dict.service'
import { SystemsService } from './../../../services/systems.service'
const SystemComponentsConnection = {
  totalCount: async (root) => {
    return await SystemsService.getSystemComponentsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  components: async (root) => {
    return await SystemsService.getSystemComponents(root.id)
  }
}
const ChildComponentsConnection = {
  totalCount: async (root) => {
    return await SystemsService.getChildComponentsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  components: async (root) => {
    return await SystemsService.getChildComponents(root.id)
  }
}
const getSystemByID = async (root, args) => {
  return await SystemsService.getSystemByID(args.id)
}
const getComponentByID = async (root, args) => {
  return await SystemsService.getComponentByID(args.id)
}
const ComponentIssueEdge = {
  node: async (root) => {
    return await SystemsService.getComponentIssue(root.id)
  }
}
const Component = {
  component: async (root) => {
    return root.componentID ?
      await SystemsService.getParentComponent(root.id) : null
  },
  issuesConnection: (root) => (root),
  childComponentsConnection: (root) => (root),
  type: async (root) => {
    return root.typeID ?
      await DictService.getDictValue(root.typeID) : null
  },
  state: async (root) => {
    return DictService.getDictValue(root.stateID)
  },
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}
const ComponentIssuesConnection = {
  totalCount: async (root) => {
    return await SystemsService.getComponentIssuesEdgesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  edges: async (root) => {
    return await SystemsService.getComponentIssuesEdges(root.id)
  }
}
const System = {
  kind: async (root) => {
    return root.kindID ?
      await DictService.getDictValue(root.kindID) : null
  },
  type: async (root) => {
    return root.typeID ?
      await DictService.getDictValue(root.typeID) : null
  },
  state: async (root) => {
    return DictService.getDictValue(root.stateID)
  },
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