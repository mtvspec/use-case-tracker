import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const createGraphQLLogger = require('graphql-log')

const debug = require('debug')('server:resolvers')

const logExecutions = createGraphQLLogger({
  prefix: 'resolvers.',
})

logExecutions(resolvers)

const typeDefs = `

  type ContactEdge implements Edge {
    id: ID!
    node: Contact!
    isActive: Boolean!
    isDeleted: Boolean!
    createdAt: String!
    createdBy: User!
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User!
    modifiedAt: String!
  }

  interface Node {
    id: ID
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    deletedBy: User
    deletedAt: String
    updatedBy: User
    updatedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  interface Edge {
    id: ID!
    node: Node!
    isDeleted: Boolean!
    createdBy: User!
    createdAt: String!
    deletedBy: User
    deletedAt: String
    updatedBy: User
    updatedAt: String
    modifiedBy: User!
    modifiedAt: String!
  }

  type User implements Node {
    id: ID
    person: Person
    username: String
    email: String
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type CustomerProjectEdge {
    node: Project
  }

  type PersonsConnection {
    totalCount: Int
    persons: [Person!]
  }

  type Person implements Node {
    id: ID
    # ИИН
    iin: String
    # Имя
    firstName: String
    # Отчество
    middleName: String
    # Фамилия
    lastName: String
    # Дата рождения
    dob: Date
    address: String
    # Заказчики
    customers: [Customer]
    internalPhone: Contact
    workPhone: Contact
    mainMobileContact: Contact
    contacts: ContactsConnection
    # Пол
    gender: DictValue
    employee: EmployeesConnection
    projectMember: [ProjectMember]
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }
  
  type ProjectMemberRolesConnection {
    totalCount: Int
    roles: [ProjectMemberRole!]
  }

  type ProjectMemberRole {
    id: ID
    projectMemberRole: DictValue
    issuesConnection: ProjectMemberRoleIssuesConnection
    description: String
    isDeleted: Boolean
    createdBy: User
    createdAt: Date
    updatedBy: User
    updatedAt: Date
    deletedBy: User
    deletedAt: Date
    modifiedBy: User
    modifiedAt: Date
  }

  type ProjectMemberRoleIssuesConnection {
    totalCount: Int
    issues: [Issue!]
  }

  type ProjectMember implements Node {
    id: ID
    team: ProjectTeam
    projectMemberRolesConnection: ProjectMemberRolesConnection
    person: Person
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type EmployeesConnection {
    totalCount: Int
    edges: [PersonEmployeeEdge!]
  }

  type PersonEmployeeEdge {
    id: ID
    node: Employee
  }

  type ContactsConnection {
    totalCount: Int
    contacts: [Contact!]
  }

  type Contact implements Node {
    id: ID
    contactType: DictValue
    contact: String
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type SystemComponentsConnection {
    totalCount: Int
    components: [Component!]
  }

  type ChildComponentsConnection {
    totalCount: Int
    components: [Component!]
  }

  type Component {
    id: ID
    component: Component
    type: DictValue
    name: String
    description: String
    childComponentsConnection: ChildComponentsConnection
    issuesConnection: ComponentIssuesConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: Date
    updatedBy: User
    updatedAt: Date
    deletedBy: User
    deletedAt: Date
    modifiedBy: User
    modifiedAt: Date
  }

  type ComponentIssuesConnection {
    totalCount: Int
    edges: [ComponentIssueEdge!]
  }

  type ComponentIssueEdge {
    id: ID
    node: Issue
  }

  type System {
    id: ID
    kind: DictValue
    type: DictValue
    name: String
    description: String
    systemComponentsConnection: SystemComponentsConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: Date
    updatedBy: User
    updatedAt: Date
    deletedBy: User
    deletedAt: Date
    modifiedBy: User
    modifiedAt: Date
  }

  type Issue implements Node {
    id: ID
    author: ProjectMember
    issueType: DictValue
    title: String
    description: String
    state: DictValue
    closedAt: String
    closedBy: User
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type DictValue implements Node {
    id: ID
    nameEn: String
    nameRu: String
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type CustomersConnection {
    totalCount: Int
    customers: [Customer!]
  }

  type CustomerProjectsConnection {
    totalCount: Int
    projects: [Project!]
  }

  type Customer implements Node {
    id: ID
    organization: Organization
    name: String
    description: String
    state: DictValue
    projectsConnection: CustomerProjectsConnection
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type ProjectsConnection {
    totalCount: Int
    projects: [Project!]
  }

  type ProjectSystemsConnection {
    totalCount: Int
    systems: [System!]
  }

  type Project {
    id: ID
    kind: DictValue
    projectName: String
    projectDescription: String
    officialProjectName: String
    customer: Customer @deprecated
    customersConnection: ProjectCustomersConnection
    manager: Employee
    curator: Employee
    planStartDate: Date
    planEndDate: Date
    planBudget: Float
    factStartDate: Date
    factEndDate: Date
    factBudget: Float
    teamsConnection: ProjectTeamsConnection
    systemsConnection: ProjectSystemsConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: Date
    updatedBy: User
    updatedAt: Date
    deletedBy: User
    deletedAt: Date
    modifiedBy: User
    modifiedAt: Date
  }

  type ProjectCustomersConnection {
    totalCount: Int
    edges: [ProjectCustomerEdge!]
  }

  type ProjectCustomerEdge {
    id: ID
    node: Organization
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: Date
    updatedBy: User
    updatedAt: Date
    deletedBy: User
    deletedAt: Date
    modifiedBy: User
    modifiedAt: Date
  }

  type ProjectTeamsConnection {
    totalCount: Int
    teams: [ProjectTeam!]
  }

  type ProjectTeam {
    id: ID
    name: String
    description: String
    projectMembersConnection: ProjectMembersConnection
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: Date
    updatedBy: User
    updatedAt: Date
    deletedBy: User
    deletedAt: Date
    modifiedBy: User
    modifiedAt: Date
  }

  type ProjectMembersConnection {
    totalCount: Int
    members: [ProjectMember!]
  }

  # Кадровая единица (КЕ)
  type Employee implements Node {
    id: ID
    organizationalUnit: OrganizationalUnit
    positionalUnit: PositionalUnit
    person: Person
    manager: Employee
    subordinates: [Employee]
    salary: Float
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type Organization implements Node {
    id: ID
    organizationalUnit: OrganizationalUnit
    bin: String
    name: String
    officialName: String
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type Query {
    node: Node
    edge: Edge
    allPersons (
      genderID: Int
      filter: String
      isDeleted: Boolean
      search: String
    ): PersonsConnection
    person (id: ID!, genderID: Int): Person
    allUsers: UsersConnection
    user (id: ID!): User
    allIssues (input: Field, filter: Field): IssuesConnection
    issue (id: ID!): Issue
    projectMember(id: ID!): ProjectMember
    allCustomers: CustomersConnection
    customer (id: ID!): Customer
    allProjects (projectName: String): ProjectsConnection
    project (id: ID!): Project
    allOrganizations: OrganizationsConnection
    organization (id: ID!): Organization
    dictValues(dictName: String!): DictConnection
    organizationalUnit (id: ID!): OrganizationalUnit
    session (id: ID!): Session!,
    system (id: ID!): System
    component (id: ID!): Component,
    organizationalUnit (id: ID!): OrganizationalUnit
  }

  type DictConnection {
    dictValues: [DictValue!]
  }

  # Организационная единица (ОЕ)
  type OrganizationalUnit implements Node {
    id: ID
    # Наименование ОЕ
    name: String
    # Описание ОЕ
    description: String
    manager: Employee
    # Руководители подразделения
    managers: [Employee]
    # Подчиненные подразделения
    childOrganizationalUnits: [OrganizationalUnit!]
    # Сотрудники подразделения
    employees: [Employee]
    # Все сотрудники подразделения и его подчиненных подразделений
    allEmployees: [Employee!]
    kind: DictValue
    type: DictValue
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }
  # Штатная единица (ШЕ)
  type PositionalUnit implements Node {
    id: ID
    organizationalUnit: OrganizationalUnit
    name: String
    description: String
    state: DictValue
    isDeleted: Boolean
    createdBy: User
    createdAt: String
    updatedBy: User
    updatedAt: String
    deletedBy: User
    deletedAt: String
    modifiedBy: User
    modifiedAt: String
  }

  type OrganizationsConnection {
    totalCount: Int
    organizations: [Organization!]
  }

  type UsersConnection {
    totalCount: Int
    users: [User]
  }

  type IssuesConnection {
    totalCount: Int
    issues: [Issue!]
  }

  input Field {
    field: String!
    value: String!
  }

  input PersonData {
    iin: String
    firstName: String!
    middleName: String
    lastName: String
    dob: String
    genderID: Int!
  }

  input IssueData {
    authorID: Int
    issueState: Int
    title: String!
    description: String
    stateID: Int
  }

  input ContactData {
    contactTypeID: ID!,
    contact: String!
  }

  type Session {
    id: ID!
    user: User!
    token: String!
    openedAt: String!
    closedAt: String
    stateID: String!
  }

  input OrganizationData {
    bin: String
    name: String!
    officialName: String
  }

  input ComponentDataInput {
    typeID: ID
    name: String!
    description: String
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

  type Mutation {
    authentificateUser (
      username: String!
      password: String!
    ): Session
    closeSession (
      id: ID!
    ): Session
    createPerson (
      input: PersonData!
    ): Person
    updatePerson (
      id: ID!
      input: PersonData!
    ): Person
    deletePerson (
      id: ID!
    ): Person
    createOrganization (
      input: OrganizationData!
    ): Organization
    updateOrganization (
      id: ID!
      input: OrganizationData!
    ): Organization
    deleteOrganization (
      id: ID!
    ): Organization
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
      componentID: ID!
      input: ComponentDataInput!
    ): Component
    updateComponent (
      id: ID!
      input: ComponentDataInput!
    ): Component
    createContact (
      personID: ID!,
      input: ContactData!
    ): Contact
    updateContact (
      id: ID!
      input: ContactData!
    ): Contact
    deleteContact (
      id: ID!
    ): Contact
  }

  scalar Date

`
export default makeExecutableSchema({ typeDefs, resolvers });