import NodeResolvers from './node'
import DictResolvers from './../resolvers/dict'
import PersonsResolvers from './../resolvers/persons'
import UsersResolvers from './../resolvers/users'
import IssuesResolvers from './../resolvers/issues'
import CustomersResolvers from './../resolvers/customers'
import ProjectsResolvers from './../resolvers/projects'
import OrganizationsResolvers from './organizations'
import SystemsResolvers from './systems'
import SessionsResovers from './sessions'
import ContactsResolvers from './contacts'
import Scalars from './scalars'

const resolvers = {
  Query: {
    allPersons: (root, args, ctx, info) => ({ root, args, ctx, info }),
    person: PersonsResolvers.queries.PersonsQueriesResolver.getPerson,
    allUsers: (root, args, ctx) => ({ root, args, ctx }),
    user: UsersResolvers.queries.getUserByID,
    currentUser: UsersResolvers.queries.currentUser,
    allIssues: (root, args, services) => ({ root, args, services }),
    issue: IssuesResolvers.queries.getIssueByID,
    projectMember: ProjectsResolvers.queries.getProjectMember,
    allCustomers: () => ({}),
    allProjects: (root, args) => ({ root, args }),
    project: ProjectsResolvers.queries.getProject,
    allOrganizations: (root, args, services) => ({}),
    organization: OrganizationsResolvers.queries.getOrganization,
    dictValues: (root, args, services) => ({ root, args, services }),
    allOrganizationalUnits: (root, args, ctx, info) => ({ root, args, ctx, info }),
    organizationalUnit: OrganizationsResolvers.queries.getOrganizationalUnit,
    session: SessionsResovers.queries.getSessionByID,
    system: SystemsResolvers.queries.getSystemByID,
    component: SystemsResolvers.queries.getComponentByID,
    employee: OrganizationsResolvers.queries.getEmployee
  },
  UsersConnection: UsersResolvers.queries.UsersConnection,
  Session: SessionsResovers.queries.Session,
  User: UsersResolvers.queries.User,
  PersonsConnection: PersonsResolvers.queries.PersonsConnection,
  Person: PersonsResolvers.queries.Person,
  OrganizationsConnection: OrganizationsResolvers.queries.OrganizationsConnection,
  Organization: OrganizationsResolvers.queries.Organization,
  OrganizationContactsConnection: OrganizationsResolvers.queries.OrganizationContactsConnection,
  OrganizationContactEdge: OrganizationsResolvers.queries.OrganizationContactEdge,
  OrganizationalUnit: OrganizationsResolvers.queries.OrganizationalUnit,
  OrganizationalUnitsConnection: OrganizationsResolvers.queries.OrganizationalUnitsConnection,
  PositionalUnit: OrganizationsResolvers.queries.PositionalUnit,
  EmployeesConnection: OrganizationsResolvers.queries.EmployeesConnection,
  PersonEmployeeEdge: OrganizationsResolvers.queries.PersonEmployeeEdge,
  Employee: OrganizationsResolvers.queries.Employee,
  CustomersConnection: CustomersResolvers.queries.CustomersConnection,
  CustomerProjectsConnection: CustomersResolvers.queries.CustomerProjectsConnection,
  Customer: CustomersResolvers.queries.Customer,
  ProjectsConnection: ProjectsResolvers.queries.ProjectsConnection,
  Project: ProjectsResolvers.queries.Project,
  System: SystemsResolvers.queries.System,
  Component: SystemsResolvers.queries.Component,
  SystemComponentsConnection: SystemsResolvers.queries.SystemComponentsConnection,
  ChildComponentsConnection: SystemsResolvers.queries.ChildComponentsConnection,
  ComponentIssuesConnection: SystemsResolvers.queries.ComponentIssuesConnection,
  ProjectMember: ProjectsResolvers.queries.ProjectMember,
  ComponentIssueEdge: SystemsResolvers.queries.ComponentIssueEdge,
  PersonContactsConnection: PersonsResolvers.queries.PersonContactsConnection,
  PersonContactEdge: PersonsResolvers.queries.PersonContactEdge,
  ProjectTeamsConnection: ProjectsResolvers.queries.ProjectTeamsConnection,
  ProjectMembersConnection: ProjectsResolvers.queries.ProjectMembersConnection,
  ProjectSystemsConnection: ProjectsResolvers.queries.ProjectSystemsConnection,
  Contact: ContactsResolvers.queries.Contact,
  ProjectTeam: ProjectsResolvers.queries.ProjectTeam,
  ProjectMemberRolesConnection: ProjectsResolvers.queries.ProjectMemberRolesConnection,
  ProjectMemberRole: ProjectsResolvers.queries.ProjectMemberRole,
  ProjectMemberRoleIssuesConnection: ProjectsResolvers.queries.ProjectMemberRoleIssuesConnection,
  IssuesConnection: IssuesResolvers.queries.IssuesConnection,
  Issue: IssuesResolvers.queries.Issue,
  DictConnection: DictResolvers.queries.DictConnection,
  DictValue: DictResolvers.queries.DictValue,
  DateTime: Scalars.DateTime,
  Mutation: {
    authentificateUser: UsersResolvers.mutations.authentificateUser,
    closeSession: SessionsResovers.mutations.closeSession,
    createPerson: PersonsResolvers.mutations.createPerson,
    updatePerson: PersonsResolvers.mutations.updatePerson,
    deletePerson: PersonsResolvers.mutations.deletePerson,
    restorePerson: PersonsResolvers.mutations.restoreDeletedPerson,
    createOrganization: OrganizationsResolvers.mutations.createOrganization,
    updateOrganization: OrganizationsResolvers.mutations.updateOrganization,
    deleteOrganization: OrganizationsResolvers.mutations.deleteOrganization,
    createOrganizationalUnit: OrganizationsResolvers.mutations.createOrganizationalUnit,
    updateOrganizationalUnit: OrganizationsResolvers.mutations.updateOrganizationalUnit,
    createPersonContact: ContactsResolvers.mutations.createPersonContact,
    updatePersonContact: ContactsResolvers.mutations.updatePersonContact,
    deleteContact: ContactsResolvers.mutations.deleteContact,
    createProject: ProjectsResolvers.mutations.createProject,
    updateProject: ProjectsResolvers.mutations.updateProject,
    deleteProject: ProjectsResolvers.mutations.deleteProject,
    createIssue: IssuesResolvers.mutations.createIssue,
    updateIssue: IssuesResolvers.mutations.updateIssue,
    deleteIssue: IssuesResolvers.mutations.deleteIssue,
    openIssue: IssuesResolvers.mutations.openIssue,
    closeIssue: IssuesResolvers.mutations.closeIssue,
    createComponent: SystemsResolvers.mutations.createComponent,
    updateComponent: SystemsResolvers.mutations.updateComponent
  }
}

export { resolvers }