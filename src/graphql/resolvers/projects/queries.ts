import { DictService } from './../../../services/dict.service'
import { ProjectsService } from './../../../services/projects.service'
import { EmployeesService } from './../../../services'
import { PersonsService } from './../../../services'
import { CustomersService } from './../../../services'
import CommonResolvers from './../common'
const getProject = async (_, args: { id: number }) => {
  return await ProjectsService.getProject(args.id)
}

const ProjectsConnection = {
  totalCount: async () => {
    return await ProjectsService.getProjectsCount()
      .then(data => { return data.totalCount })
  },
  projects: async (root: any) => {
    return root.args.projectName ? await ProjectsService.getProjectByProjectName(root.args.projectName) :
      await ProjectsService.getProjects()
  }
}

const ProjectSystemsConnection = {
  totalCount: async (root: { id: number }) => {
    return await ProjectsService.getProjectSystemsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  systems: async (root: { id: number }) => {
    return await ProjectsService.getProjectSystems(root.id)
  }
}

const ProjectMemberRoleIssuesConnection = {
  totalCount: async (root: { id: number }) => {
    return await ProjectsService.getProjectMemberRoleIssuesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  issues: async (root: any) => {
    return await ProjectsService.getProjectMemberRoleIssues(root.id)
  }
}

const Project = {
  manager: async (root: { projectManager: number }, _, ctx, info) => {
    return root.projectManager ?
      await EmployeesService.getEmployee({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.projectManager }
      }) : null
  },
  curator: async (root: { projectCurator: number }, _, ctx, info) => {
    return root.projectCurator ?
      await EmployeesService.getEmployee({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.projectCurator }
      }) : null
  },
  kind: async (root: { kind: number }, _, ctx, info) => {
    return root.kind ?
      await DictService.getDictValue({
        unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
        source: { id: root.kind }
      }) : null
  },
  state: CommonResolvers.state,
  teamsConnection: (root) => (root),
  systemsConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectTeamsConnection = {
  totalCount: async (root: { id: number }) => {
    return await ProjectsService.getProjectTeamsCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  teams: async (root: { id: number }) => {
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
  totalCount: async (root: { id: number }) => {
    return await ProjectsService.getProjectTeamMembersCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  members: async (root) => {
    return await ProjectsService.getProjectMembers(root.id)
  }
}

const ProjectMemberRole = {
  projectMemberRole: async (root: { projectMemberRole: number }, _, ctx, info) => {
    return await DictService.getDictValue({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.projectMemberRole }
    })
  },
  issuesConnection: (root) => (root),
  createdBy: CommonResolvers.createdBy,
  updatedBy: CommonResolvers.updatedBy,
  deletedBy: CommonResolvers.deletedBy,
  modifiedBy: CommonResolvers.modifiedBy
}

const ProjectMemberRolesConnection = {
  totalCount: async (root: { id: number }) => {
    return await ProjectsService.getProjectTeamMembersRolesCount(root.id)
      .then((data: any) => { return data.totalCount })
  },
  roles: async (root) => {
    return await ProjectsService.getProjectMemberRoles(root.id)
  }
}

const getProjectMember = async (_, args: { id: number }) => {
  return await ProjectsService.getProjectMember(args.id)
}

const ProjectMember = {
  person: async (root: { person: number }, _, ctx, info) => {
    return await PersonsService.getPerson({
      unfilteredFields: Object.keys(ctx.utils.parseFields(info)),
      source: { id: root.person }
    })
  },
  team: async (root: { team: number }) => {
    return await ProjectsService.getProjectTeam(root.team)
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