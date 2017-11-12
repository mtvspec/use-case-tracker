import { ICreatePerson, IUpdatePerson, IDeletePerson } from './../../models/person.model'
import db from './../../knex'
const PERSONS_TABLE: string = 'persons.e_person'
const PERSON_CONTACT_EDGES_TABLE: string = 'persons.r_e_person_e_contact'
import {
  DatabaseService
} from './../database.service'

interface field {
  name: string
}

let personTableFields: field[] = []
let personContactEdgesTableFields: field[] = []
let contactTableFields: field[] = []

export class PersonsService extends DatabaseService {
  public static getPersonsCount () {
    return this.getNodesCount(
      PERSONS_TABLE
    )
  }
  public static getPersonContactsEdges (unfilteredFiels: field[], node: number, args: any) {
    return this.getEdge(
      PERSON_CONTACT_EDGES_TABLE,
      personContactEdgesTableFields,
      unfilteredFiels,
      node,
      args
    )
  }
  public static getPersonsCountByArgs (args: any) {
    return this.getNodesCount(
      PERSONS_TABLE,
      null,
      args
    )
  }
  public static getPersons (unfilteredFiels: field[]) {
    return this.getNodes(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels
    )
  }
  public static restorePerson (id: number, user: number) {
    return this.restoreDeletedNode(
      PERSONS_TABLE,
      id,
      user
    )
  }
  public static async searchPersons (unfilteredFiels: field[], search: string, args: any, orderBy?: any) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.searchNode(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      search,
      fields,
      orderBy
    )
  }
  public static async filterPersons (unfilteredFiels: field[], args: any, orderBy?: any) {
    return this.filterNodes(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      args,
      orderBy
    )
  }
  public static getPerson (unfilteredFiels: field[], id: number) {
    return this.getNode(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      id
    )
  }
  public static async createPerson (data: ICreatePerson, user: number) {
    return this.createNode(
      PERSONS_TABLE,
      data,
      user
    )
  }
  public static updatePerson (data: IUpdatePerson, user: number) {
    return this.updateNode(
      PERSONS_TABLE,
      data,
      user
    )
  }
  public static deletePerson (id: number, user: number) {
    return this.deleteNode(
      PERSONS_TABLE,
      id,
      user
    )
  }
  public static async getPersonsContactsCount (source: number) {
    return this.getNodesCount(
      PERSON_CONTACT_EDGES_TABLE,
      source
    )
  }

}

const getPersonTableFields = (async () => {
  const response: any = await <any>PersonsService.fields(PERSONS_TABLE)
  response.forEach((field: any) => personTableFields.push(field.name))
})()

const getPersonContactEdgesTableFields = (async () => {
  const response: any = await <any>PersonsService.fields(PERSON_CONTACT_EDGES_TABLE)
  response.forEach((field: any) => personContactEdgesTableFields.push(field.name))
})()