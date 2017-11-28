import { DocumentNode } from "graphql"
import gql from "graphql-tag"

export const types: { [key: string]: DocumentNode } = {

  OrganizationType: gql`

  # Юридическое лицо (ЮЛ)
  type Organization implements Node {
    id: ID!
    organizationalUnits: [OrganizationalUnit]
    bin: String
    name: String!
    officialName: String
    address: String
    manager: Employee
    contacts: OrganizationContactsConnection
    mainPhone: Contact
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

`
  ,

  OrganizationalUnitType: gql`
  
  # Организационная единица (ОЕ)
  type OrganizationalUnit implements Node {
    id: ID!
    organization: Organization
    organizationalUnit: OrganizationalUnit
    curator: Employee
    # Наименование ОЕ
    name: String!
    # Описание ОЕ
    description: String
    kind: DictValue
    type: DictValue
    manager: Employee
    # Руководители подразделения
    managers: [Employee]
    # Подчиненные подразделения
    childOrganizationalUnits: [OrganizationalUnit!]
    # Сотрудники подразделения
    employees: [Employee]
    # Все сотрудники подразделения и его подчиненных подразделений
    allEmployees: [Employee!]
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
  
`
  ,

  PositionalUnitType: gql`
  
  # Штатная единица (ШЕ)
  type PositionalUnit implements Node {
    id: ID!
    name: String
    description: String
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
  
`,
  OrganizationalUnitsConnectionType: gql`

  type OrganizationalUnitsConnection {
    totalCount: Int
    organizationalUnits: [OrganizationalUnit!]
  }

`
  ,

  OrganizationsConnectionType: gql`
  
  type OrganizationsConnection {
    totalCount: Int
    organizations: [Organization!]
  }

`
  ,

  OrganizationContactsConnectionType: gql`

  type OrganizationContactsConnection {
    totalCount: Int
    edges (
      createdAt: DateTimeFilter
      updatedAt: DateTimeFilter
      deletedAt: DateTimeFilter
      modifiedAt: DateTimeFilter
    ): [OrganizationContactEdge]
  }

`
  ,

  OrganizationContactEdgeType: gql`

  type OrganizationContactEdge implements Edge {
    id: ID!
    node: Contact!
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

`
} 