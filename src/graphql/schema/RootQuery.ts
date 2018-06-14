import { DocumentNode } from "graphql"
import gql from "graphql-tag"

export const RootQuery: DocumentNode = gql`

  type Query {
    node: Node
    edge: Edge
    allPersons (
      search: String
      searchPersonFields: SearchPersonFields
      filter: PersonDataFilterFields
    ): PersonsConnection
    person (
      id: ID!
      filter: PersonDataFilterFields
    ): Person
    allUsers: UsersConnection
    birthdays (month: Int): [Person]
    user (id: ID!): User
    allRoles: RolesConnection
    currentUser: User
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
    allOrganizationalUnits (
      organization: ID
      search: String
    ): OrganizationalUnitsConnection
    organizationalUnit (id: ID!): OrganizationalUnit
    session (id: ID!): Session!
    system (id: ID!): System
    component (id: ID!): Component
    organizationalUnit (id: ID!): OrganizationalUnit
    employee (id: ID!): Employee
  }

`