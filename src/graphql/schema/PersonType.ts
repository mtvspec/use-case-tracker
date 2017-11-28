import { DocumentNode } from "graphql"
import gql from "graphql-tag"

export const types: { [key: string]: DocumentNode } = {

  PersonsConnectionType: gql`
  
  type PersonsConnection {
    totalCount: Int
    persons: [Person!]
  }

`
  ,

  PersonContactsConnectionType: gql`
  
  # Контакты ФЛ
  type PersonContactsConnection {
    totalCount: Int
    edges (
      createdAt: DateTimeFilter
        updatedAt: DateTimeFilter
        deletedAt: DateTimeFilter
        modifiedAt: DateTimeFilter
    ): [PersonContactEdge]
  }

`
  ,

  PersonContactEdgeType: gql`

  # Контакт ФЛ
  type PersonContactEdge implements Edge {
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

`,

  PersonType: gql`

  # Физическое лицо
  type Person implements Node {
    id: ID!
    # ИИН
    iin: String
    # Имя
    firstName: String
    # Отчество
    middleName: String
    # Фамилия
    lastName: String
    # Дата рождения
    dob: DateTime
    address: String
    photo: String
    # Заказчики
    customers: [Customer]
    internalPhone: Contact
    workPhone: Contact
    mobilePhone: Contact
    # Контакты
    contacts: PersonContactsConnection
    # Пол
    gender: DictValue
    employee: EmployeesConnection
    projectMember: [ProjectMember]
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