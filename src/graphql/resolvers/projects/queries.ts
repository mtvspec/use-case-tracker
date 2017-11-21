import { DictService } from './../../../services/dict.service'
import { ProjectsService } from './../../../services/projects.service'
import { EmployeesService } from './../../../services'
import { PersonsService } from './../../../services'
import { CustomersService } from './../../../services'
import CommonResolvers from './../common'
const getProject = async (root: any, args: { id: number }) => {
  return await ProjectsService.getProject(args.id)
}

const ProjectsConnection = {
  totalCount: async (root: any) => {
    return await ProjectsService.getProjectsCount()
      .then(data => { return data.totalCount })
  },
  projects: async (root: any) => {
    return root.args.projectName ? await ProjectsService.getProjectByProjectName(root.args.projectName) :
      await ProjectsService.getProjects()
  }
}

const ProjectSystemsConnection = {
  totalCount: async (root: any) => {
    return await ProjectsService.getProjectSystemsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  systems: async (root: any) => {
    return await ProjectsService.getProjectSystems(root.id)
  }
}

const ProjectMemberRoleIssuesConnection = {
  totalCount: async (root: any) => {
    return await ProjectsService.getProjectMemberRoleIssuesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  issues: async (root: any) => {
    return await ProjectsService.getProjectMemberRoleIssues(root.id)
  }
}

const Project = {
  manager: async (root: { projectManager: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.projectManager ?
      await EmployeesService.getEmployee(fields, root.projectManager) : null
  },
  curator: async (root: { projectCurator: number }, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.projectCurator ?
      await EmployeesService.getEmployee(fields, root.projectCurator) : null
  },
  kind: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return root.kind ?
      await DictService.getDictValue(fields, root.kind) : null
  },
  state: CommonResolvers.state,
  teamsConnection: (root: any) => (root),
  systemsConnection: (root: any) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectTeamsConnection = {
  totalCount: async (root: any) => {
    return await ProjectsService.getProjectTeamsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  teams: async (root: any) => {
    return await ProjectsService.getProjectTeams(root.id)
  }
}

const ProjectTeam = {
  projectMembersConnection: (root: any) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectMembersConnection = {
  totalCount: async (root: any) => {
    return await ProjectsService.getProjectTeamMembersCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  members: async (root: any) => {
    return await ProjectsService.getProjectMembers(root.id)
  }
}

const ProjectMemberRole = {
  projectMemberRole: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await DictService.getDictValue(fields, root.projectMemberRole)
  },
  issuesConnection: (root: any) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectMemberRolesConnection = {
  totalCount: async (root: any) => {
    return await ProjectsService.getProjectTeamMembersRolesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  roles: async (root: any) => {
    return await ProjectsService.getProjectMemberRoles(root.id)
  }
}

const getProjectMember = async (root: any, args: { id: number }) => {
  return await ProjectsService.getProjectMember(args.id)
}

const ProjectMember = {
  person: async (root: any, args: any, ctx: any, info: any) => {
    const fields: any = Object.keys(ctx.utils.parseFields(info))
    return await PersonsService.getPerson(fields, { id: root.person })
  },
  team: async (root: { team: number }) => {
    return await ProjectsService.getProjectTeam(root.team)
  },
  projectMemberRolesConnection: (root: any) => (root),
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