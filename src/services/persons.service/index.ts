import { DatabaseService } from './../database.service'
const PERSONS_TABLE: string = 'persons.e_person'
const PERSON_CONTACT_EDGES_TABLE: string = 'persons.r_e_person_e_contact'
let personTableFields: string[] = []
let personContactEdgesTableFields: string[] = []

const ServiceConfig = {
  table: PERSONS_TABLE,
  tableFields: personTableFields,
}

interface GetNodesConfig {
  unfilteredFields: string[]
  args: { [key: string]: any }
  filter: { [key: string]: any }
  search: string
  except: { [key: string]: any }
  orderBy: string[]
}

interface GetNodeConfig {
  unfilteredFields: string[]
  args: { [key: string]: any }
  filter: { [key: string]: any }
  except: { [key: string]: any }
}

interface GetNodesCount {
  args: { [key: string]: any }
  filter: { [key: string]: any }
  search: string
  except: { [key: string]: any }
}

export class PersonsService extends DatabaseService {
  public static getPersonsCount (config: GetNodesCount) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.getNodesCount(Object.assign({}, config, ServiceConfig, { fields }))
  }
  public static getPersonContactsEdges (unfilteredFiels: string[], node, args: any) {
    return this.getEdges(
      PERSON_CONTACT_EDGES_TABLE,
      personContactEdgesTableFields,
      unfilteredFiels,
      node,
      args.length > 0 ? args : null
    )
  }
  public static getPersons (config: GetNodesConfig) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.getNodes(Object.assign({}, config, ServiceConfig, { fields }))
  }
  public static restorePerson (id: number, user: number) {
    return this.restoreNode(
      PERSONS_TABLE,
      id,
      user
    )
  }
  public static getPerson (config: GetNodeConfig) {
    return this.getNode(Object.assign({}, config, ServiceConfig))
  }
  public static async createPerson (data: any, user: number) {
    return this.createNode({
      table: PERSONS_TABLE,
      tableFields: personTableFields,
      data,
      user
    })
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
  public static async getPersonContactsCount (args?: any, except?: any, search?: string) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\""]
    return this.getNodesCount({
      table: PERSON_CONTACT_EDGES_TABLE,
      tableFields: personContactEdgesTableFields,
      args,
      except,
      search,
      fields
    })
  }
  public static getPhone (unfilteredFields: string[] = ['node'], source: any, args?: any) {
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
  if (response && response.length > 0) ServiceConfig.tableFields = response
  else console.trace(response)
})();

(async function getPersonContactEdgesTableFields () {
  const response: any = await <any>PersonsService.fields(PERSON_CONTACT_EDGES_TABLE)
  if (response && response.length > 0) personContactEdgesTableFields = response
  else console.trace(response)
})();