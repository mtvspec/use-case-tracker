import { DictService } from './../../../services/dict.service'
import { ProjectsService } from './../../../services/projects.service'
import { EmployeesService } from './../../../services'
import { PersonsService } from './../../../services'
import { CustomersService } from './../../../services'
import CommonResolvers from './../common';
const getProject = async (root, args, context) => {
  return await ProjectsService.getProject(args.id)
}

const ProjectsConnection = {
  totalCount: async (root) => {
    return await ProjectsService.getProjectsCount()
      .then(data => { return data.totalCount })
  },
  projects: async (root) => {
    return root.args.projectName ? await ProjectsService.getProjectByProjectName(root.args.projectName) :
      await ProjectsService.getProjects()
  }
}

const ProjectSystemsConnection = {
  totalCount: async (root) => {
    return await ProjectsService.getProjectSystemsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  systems: async (root) => {
    return await ProjectsService.getProjectSystems(root.id)
  }
}

const ProjectMemberRoleIssuesConnection = {
  totalCount: async (root) => {
    return await ProjectsService.getProjectMemberRoleIssuesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  issues: async (root) => {
    return await ProjectsService.getProjectMemberRoleIssues(root.id)
  }
}

const Project = {
  customer: async (root, args, context) => {
    return root.customerID ?
      await CustomersService.getCustomer(root.customerID) : null
  },
  manager: async (root, args, context) => {
    return root.projectManagerID ?
      await EmployeesService.getEmployee(root.projectManagerID) : null
  },
  curator: async (root, args, context) => {
    return root.projectCuratorID ?
      await EmployeesService.getEmployee(root.projectCuratorID) : null
  },
  kind: async (root, args, context) => {
    return root.kindID ?
      await DictService.getDictValue(root.kindID) : null
  },
  state: async (root, args) => {
    return DictService.getDictValue(root.stateID)
  },
  teamsConnection: (root) => (root),
  systemsConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectTeamsConnection = {
  totalCount: async (root) => {
    return await ProjectsService.getProjectTeamsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  teams: async (root) => {
    return await ProjectsService.getProjectTeams(root.id)
  }
}

const ProjectTeam = {
  projectMembersConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectMembersConnection = {
  totalCount: async (root) => {
    return await ProjectsService.getProjectTeamMembersCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  members: async (root) => {
    return await ProjectsService.getProjectMembers(root.id)
  }
}

const ProjectMemberRole = {
  projectMemberRole: async (root) => {
    return await DictService.getDictValue(root.projectMemberRoleID)
  },
  issuesConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectMemberRolesConnection = {
  totalCount: async (root) => {
    return await ProjectsService.getProjectTeamMembersRolesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  roles: async (root) => {
    return await ProjectsService.getProjectMemberRoles(root.id)
  }
}

const getProjectMember = async (root, args, context) => {
  return await ProjectsService.getProjectMember(args.id)
}

const ProjectMember = {
  person: async (root, args, context, info) => {
    const unfilteredFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value)
    return await PersonsService.getPerson(unfilteredFields, root.personID)
  },
  team: async (root, args, context) => {
    return await ProjectsService.getProjectTeam(root.teamID)
  },
  projectMemberRolesConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectsResolvers = {
  getProject,
  ProjectsConnection,
  Project,
  ProjectTeam,
  ProjectMember,
  ProjectTeamsConnection,
  getProjectMember,
  ProjectMemberRole,
  ProjectMembersConnection,
  ProjectMemberRolesConnection,
  ProjectMemberRoleIssuesConnection,
  ProjectSystemsConnection,
}

export default ProjectsResolvers