import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

const createGraphQLLogger = require('graphql-log')
const logExecutions = createGraphQLLogger({
  prefix: 'resolvers.',
})
logExecutions(resolvers)

import { types as PersonTypes } from './schema/PersonType'
import { types as OrganizationTypes } from './schema/OrganizationType'
import { RootQuery } from './schema/RootQuery'

const typeDefs: DocumentNode = gql`

  interface Node {
    id: ID!
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  interface Edge {
    id: ID!
    node: Node!
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ContactEdge implements Edge {
    id: ID!
    node: Contact!
    isActive: Boolean
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  # Пользователь
  type User implements Node {
    id: ID!
    person: Person
    username: String
    email: String
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type CustomerProjectEdge implements Edge {
    id: ID!
    node: Project!
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  # Контакт
  type Contact implements Node {
    id: ID!
    contactType: DictValue
    contact: String
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }
  
  type ProjectMemberRolesConnection {
    totalCount: Int
    roles: [ProjectMemberRole!]
  }

  type ProjectMemberRole implements Node {
    id: ID!
    projectMemberRole: DictValue
    issuesConnection: ProjectMemberRoleIssuesConnection
    description: String
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ProjectMemberRoleIssuesConnection {
    totalCount: Int
    issues: [Issue!]
  }

  type ProjectMember implements Node {
    id: ID!
    team: ProjectTeam
    projectMemberRolesConnection: ProjectMemberRolesConnection
    person: Person
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type EmployeesConnection {
    totalCount: Int
    edges: [PersonEmployeeEdge]
  }

  type PersonEmployeeEdge implements Edge {
    id: ID!
    node: Employee!
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type SystemComponentsConnection {
    totalCount: Int
    components: [Component!]
  }

  input DateTimeFilter {
    start: DateTime
    end: DateTime
  }

  type ChildComponentsConnection {
    totalCount: Int
    components: [Component!]
  }

  type Component implements Node {
    id: ID!
    component: Component
    type: DictValue
    name: String
    description: String
    childComponentsConnection: ChildComponentsConnection
    issuesConnection: ComponentIssuesConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ComponentIssuesConnection {
    totalCount: Int
    edges: [ComponentIssueEdge!]
  }

  type ComponentIssueEdge implements Edge {
    id: ID!
    node: Issue!
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type System implements Node {
    id: ID!
    kind: DictValue
    type: DictValue
    name: String
    description: String
    systemComponentsConnection: SystemComponentsConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type Issue implements Node {
    id: ID!
    author: ProjectMember
    issueType: DictValue
    title: String
    description: String
    state: DictValue
    closedAt: String
    closedBy: User
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type DictValue implements Node {
    id: ID!
    nameEn: String
    nameRu: String
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type CustomersConnection {
    totalCount: Int
    customers: [Customer!]
  }

  type CustomerProjectsConnection {
    totalCount: Int
    projects: [Project!]
  }

  # Заказчик
  type Customer implements Node {
    id: ID!
    organization: Organization!
    name: String
    description: String
    state: DictValue
    projectsConnection: CustomerProjectsConnection
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ProjectsConnection {
    totalCount: Int
    projects: [Project!]
  }

  type ProjectSystemsConnection {
    totalCount: Int
    systems: [System!]
  }

  # Проект
  type Project implements Node {
    id: ID!
    kind: DictValue
    projectName: String
    projectDescription: String
    officialProjectName: String
    customersConnection: ProjectCustomersConnection
    manager: Employee
    curator: Employee
    planStartDate: DateTime
    planEndDate: DateTime
    planBudget: Float
    factStartDate: DateTime
    factEndDate: DateTime
    factBudget: Float
    teamsConnection: ProjectTeamsConnection
    systemsConnection: ProjectSystemsConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ProjectCustomersConnection {
    totalCount: Int
    edges: [ProjectCustomerEdge!]
  }

  type ProjectCustomerEdge implements Edge {
    id: ID!
    node: Organization!
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ProjectTeamsConnection {
    totalCount: Int
    teams: [ProjectTeam!]
  }

  type ProjectTeam implements Node {
    id: ID!
    name: String
    description: String
    projectMembersConnection: ProjectMembersConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type ProjectMembersConnection {
    totalCount: Int
    members: [ProjectMember!]
  }

  # Кадровая единица (КЕ)
  type Employee implements Node {
    id: ID!
    organization: Organization
    organizationalUnit: OrganizationalUnit
    positionalUnit: PositionalUnit
    person: Person!
    manager: Employee
    subordinates: [Employee]
    subordinatedOrganizationalUnits: [OrganizationalUnit]
    salary: Float
    isDeleted: Boolean
    createdBy: User
    createdAt: DateTime
    updatedBy: User
    updatedAt: DateTime
    deletedBy: User
    deletedAt: DateTime
    modifiedBy: User
    modifiedAt: DateTime
  }

  type DictConnection {
    dictValues: [DictValue!]
  }

  type UsersConnection {
    totalCount: Int
    users: [User]
  }

  type IssuesConnection {
    totalCount: Int
    issues: [Issue!]
  }

  type Session {
    id: ID!
    user: User!
    token: String!
    openedAt: String!
    closedAt: String
    state: String!
  }

  input Field {
    field: String!
    value: String!
  }

  input NewPersonContactData {
    person: ID!
    contactType: ID!
    contact: String!
    isMainInternalPhone: Boolean
    isMainWorkPhone: Boolean
    isMainMobilePhone: Boolean
  }

  input UpdatedPersonContactData {
    id: ID!,
    contactType: ID
    contact: String
  }

  input NewPersonData {
    iin: String
    firstName: String!
    middleName: String
    lastName: String
    dob: DateTime
    gender: Int
  }

  input UpdatedPersonData {
    id: ID!
    iin: String
    firstName: String
    middleName: String
    lastName: String
    dob: String
    gender: ID
  }

  input IssueData {
    author: Int
    title: String!
    description: String
    state: Int
  }

  input OrganizationData {
    bin: String
    name: String!
    officialName: String
  }

  enum SearchPersonFields {
    iin
    lastName
    firstName
    middleName
  }

  input ComponentDataInput {
    type: ID
    name: String!
    description: String
  }

  input PersonDataFilterFields {
    isDeleted: Boolean
    state: ID
    gender: ID
    createdBy: ID
    updatedBy: ID
    deletedBy: ID
    modifiedBy: ID
  }

  input ProjectDataInput {
    projectName: String!
    projectDescription: String
    officialProjectName: String
    planStartDate: String
    planEndDate: String
    planBudget: Float
    factStartDate: String
    factEndDate: String
    factBudget: Float
  }

  input OrganizationalUnitInputData {
    organization: ID
    manager: ID
    organizationalUnit: ID
    kind: ID
    type: ID
    name: String!
    description: String
  }

  input UpdatedOrganizationInputData {
    id: ID!
    bin: String
    name: String
    officialName: String
  }

  input UpdatedOrganizationalUnitInputData {
    id: ID
    organization: ID
    manager: ID
    organizationalUnit: ID
    kind: ID
    type: ID
    name: String
    description: String @validate
  }

  input UserCredentialsInput {
    username: String!
    password: String!
  }

  type Mutation {
    authentificateUser (
      input: UserCredentialsInput!
    ): Session
    closeSession: Session
    createPerson (
      input: NewPersonData!
    ): Person
    updatePerson (
      input: UpdatedPersonData!
    ): Person
    deletePerson (
      id: ID!
    ): Person
    restorePerson (
      id: ID!
    ): Person
    createOrganization (
      input: OrganizationData!
    ): Organization
    updateOrganization (
      input: UpdatedOrganizationInputData!
    ): Organization
    deleteOrganization (
      id: ID!
    ): Organization
    createOrganizationalUnit (
      input: OrganizationalUnitInputData!
    ): OrganizationalUnit
    updateOrganizationalUnit (
      input: UpdatedOrganizationalUnitInputData!
    ): OrganizationalUnit
    createProject (
      input: ProjectDataInput!
    ): Project
    updateProject (
      id: ID!
      input: ProjectDataInput!
    ): Project
    deleteProject (
      id: ID!
    ): Project
    createIssue (
      input: IssueData!
    ): Issue
    updateIssue (
      id: ID!
      input: IssueData!
    ): Issue
    deleteIssue (
      id: ID!
    ): Issue
    openIssue (
      id: ID!
    ): Issue
    closeIssue (
      id: ID!
    ): Issue
    createComponent (
      component: ID!
      input: ComponentDataInput!
    ): Component
    updateComponent (
      id: ID!
      input: ComponentDataInput!
    ): Component
    createPersonContact (
      input: NewPersonContactData!
    ): Contact
    updatePersonContact (
      input: UpdatedPersonContactData!
    ): Contact
    deleteContact (
      id: ID!
    ): Contact
  }

  scalar DateTime

`
export default makeExecutableSchema({
  typeDefs: [
    RootQuery,
    typeDefs,
    PersonTypes['PersonType'],
    PersonTypes['PersonsConnectionType'],
    PersonTypes['PersonContactsConnectionType'],
    PersonTypes['PersonContactEdgeType'],
    OrganizationTypes['OrganizationType'],
    OrganizationTypes['PositionalUnitType'],
    OrganizationTypes['OrganizationsConnectionType'],
    OrganizationTypes['OrganizationalUnitType'],
    OrganizationTypes['OrganizationalUnitsConnectionType'],
    OrganizationTypes['OrganizationContactsConnectionType'],
    OrganizationTypes['OrganizationContactEdgeType']
  ], resolvers
});