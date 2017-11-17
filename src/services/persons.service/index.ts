import { DatabaseService } from './../database.service'
const PERSONS_TABLE: string = 'persons.e_person'
const PERSON_CONTACT_EDGES_TABLE: string = 'persons.r_e_person_e_contact'
let personTableFields: string[] = []
let personContactEdgesTableFields: string[] = []

export class PersonsService extends DatabaseService {
  public static getPersonsCount (source: any, args: any, except: any, search: any) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.getNodesCount(
      PERSONS_TABLE,
      personTableFields,
      source,
      args,
      except,
      search,
      fields
    )
  }
  public static getPersonContactsEdges (unfilteredFiels: string[], node: number, args: any) {
    return this.getEdges(
      PERSON_CONTACT_EDGES_TABLE,
      personContactEdgesTableFields,
      unfilteredFiels,
      node,
      args.length > 0 ? args : null
    )
  }
  public static getPersonsCountByArgs (args: any, source?: any, except?: any) {
    return this.getNodesCount(
      PERSONS_TABLE,
      personTableFields,
      source,
      args,
      except
    )
  }
  public static getPersons (unfilteredFiels: string[], id?: number | string, args?: any, except?: any, orderBy?: string[]) {
    return this.getNodes(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      id || null,
      args || null,
      except || null,
      orderBy || null
    )
  }
  public static restorePerson (id: number, user: number) {
    return this.restoreNode(
      PERSONS_TABLE,
      id,
      user
    )
  }
  public static async searchPersons (unfilteredFiels: string[], search: string, args: any, orderBy?: any) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.searchNode(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      search,
      args,
      fields,
      orderBy
    )
  }
  public static async filterPersons (unfilteredFiels: string[], args: any, orderBy?: any) {
    return this.filterNodes(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      args,
      orderBy
    )
  }
  public static getPerson (unfilteredFiels: string[], id: number, args: any) {
    return this.getNode(
      PERSONS_TABLE,
      personTableFields,
      unfilteredFiels,
      id,
      args
    )
  }
  public static async createPerson (data: any, user: number) {
    return this.createNode(
      PERSONS_TABLE,
      personTableFields,
      data,
      user
    )
  }
  public static updatePerson (data: any, user: number) {
    return this.updateNode(
      PERSONS_TABLE,
      personTableFields,
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
  public static async getPersonContactsCount (source: number, args?: any, except?: any, search?: string) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.getNodesCount(
      PERSON_CONTACT_EDGES_TABLE,
      personContactEdgesTableFields,
      source,
      (args && args.length) > 0 ? args : null,
      (except && except.length) > 0 ? except : null,
      search ? search : null,
      search ? fields : null
    )
  }
  public static getPhone (unfilteredFields: string[] = ['node'], source: number, args?: any) {
    return this.getEdge(
      PERSON_CONTACT_EDGES_TABLE,
      personContactEdgesTableFields,
      unfilteredFields,
      source,
      args || null
    )
  }
}

(async function getPersonTableFields () {
  const response: any = await <any>PersonsService.fields(PERSONS_TABLE)
  if (response && response.length > 0) personTableFields = response
  else console.trace(response)
})();

(async function getPersonContactEdgesTableFields () {
  const response: any = await <any>PersonsService.fields(PERSON_CONTACT_EDGES_TABLE)
  if (response && response.length > 0) personContactEdgesTableFields = response
  else console.trace(response)
})();