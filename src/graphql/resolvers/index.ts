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
import CustomScalarsResolvers from './scalars'

const resolvers = {
  Query: {
    node: (root, args, services) => ({ root, args, services }),
    allPersons: (root, args, services) => ({ root, args, services }),
    person: PersonsResolvers.queries.PersonsQueriesResolver.getPersonByID,
    allUsers: (root, args, services) => ({ root, args, services }),
    user: UsersResolvers.queries.getUserByID,
    allIssues: (root, args, services) => ({ root, args, services }),
    issue: IssuesResolvers.queries.getIssueByID,
    projectMember: ProjectsResolvers.queries.getProjectMember,
    allCustomers: () => ({}),
    customer: CustomersResolvers.queries.getCustomerByID,
    allProjects: (root, args) => ({ root, args }),
    project: ProjectsResolvers.queries.getProject,
    allOrganizations: (root, args, { services: { OrganizationsService } }) => ({}),
    organization: OrganizationsResolvers.queries.getOrganizationByID,
    dictValues: (root, args, services) => ({ root, args, services }),
    organizationalUnit: OrganizationsResolvers.queries.getOrganizationalUnitByID,
    session: SessionsResovers.queries.getSessionByID,
    system: SystemsResolvers.queries.getSystemByID,
    component: SystemsResolvers.queries.getComponentByID,
  },
  Node: NodeResolvers.queries.Node,
  UsersConnection: UsersResolvers.queries.UsersConnection,
  Session: SessionsResovers.queries.Session,
  User: UsersResolvers.queries.User,
  PersonsConnection: PersonsResolvers.queries.PersonsConnection,
  Person: PersonsResolvers.queries.Person,
  OrganizationsConnection: OrganizationsResolvers.queries.OrganizationsConnection,
  Organization: OrganizationsResolvers.queries.Organization,
  OrganizationalUnit: OrganizationsResolvers.queries.OrganizationalUnit,
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
  ContactsConnection: PersonsResolvers.queries.ContactsConnection,
  ProjectTeamsConnection: ProjectsResolvers.queries.ProjectTeamsConnection,
  ProjectMembersConnection: ProjectsResolvers.queries.ProjectMembersConnection,
  ProjectSystemsConnection: ProjectsResolvers.queries.ProjectSystemsConnection,
  Contact: PersonsResolvers.queries.Contact,
  ProjectTeam: ProjectsResolvers.queries.ProjectTeam,
  ProjectMemberRolesConnection: ProjectsResolvers.queries.ProjectMemberRolesConnection,
  ProjectMemberRole: ProjectsResolvers.queries.ProjectMemberRole,
  ProjectMemberRoleIssuesConnection: ProjectsResolvers.queries.ProjectMemberRoleIssuesConnection,
  IssuesConnection: IssuesResolvers.queries.IssuesConnection,
  Issue: IssuesResolvers.queries.Issue,
  DictConnection: DictResolvers.queries.DictConnection,
  DictValue: DictResolvers.queries.DictValue,
  Date: CustomScalarsResolvers.Date,
  Mutation: {
    authentificateUser: UsersResolvers.mutations.authentificateUser,
    closeSession: SessionsResovers.mutations.closeSession,
    createPerson: PersonsResolvers.mutations.createPerson,
    updatePerson: PersonsResolvers.mutations.updatePerson,
    deletePerson: PersonsResolvers.mutations.deletePerson,
    createOrganization: OrganizationsResolvers.mutations.createOrganization,
    updateOrganization: OrganizationsResolvers.mutations.updateOrganization,
    deleteOrganization: OrganizationsResolvers.mutations.deleteOrganization,
    createContact: PersonsResolvers.mutations.createContact,
    updateContact: PersonsResolvers.mutations.updateContact,
    deleteContact: PersonsResolvers.mutations.deleteContact,
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