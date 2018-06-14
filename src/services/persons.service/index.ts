import { DatabaseService, ServiceConfig } from './../database.service'
import { EdgesConfig, NodesCountConfig, EdgesCountConfig, NodeConfig, NodesConfig } from '../interfaces'

export class PersonsService extends DatabaseService {
  private static PersonConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  private static PersonContactsConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  constructor() {
    super()
    async function getPersonTableFields (table: string) {
      PersonsService.PersonConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) PersonsService.PersonConfig.tableFields = response
      else console.trace(response)
    }
    getPersonTableFields('persons.e_person')
    async function getPersonContactEdgesTableFields (table: string) {
      PersonsService.PersonContactsConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) PersonsService.PersonContactsConfig.tableFields = response
      else console.trace(response)
    }
    getPersonContactEdgesTableFields('persons.r_e_person_e_contact')
  }
  public static getPersonsCount (config: NodesCountConfig) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\"", '\' \'', "\"dob\""]
    return this.getNodesCount(Object.assign({}, config, this.PersonConfig, { fields }))
  }
  public static getPersons (config: NodesConfig) {
    const fields = ["\"lastName\"", '\' \'', "\"firstName\"", '\' \'', "\"middleName\"", '\' \'', "\"iin\"", '\' \'', "\"dob\""]
    return this.getNodes(Object.assign({}, config, this.PersonConfig, { fields }))
  }
  public static getPerson (config: NodeConfig) {
    return this.getNode(Object.assign({}, PersonsService.PersonConfig, config))
  }
  public static async createPerson (config: { unfilteredFields: string[], data: any, user: number }) {
    return this.createNode(Object.assign({}, this.PersonConfig, config))
  }
  public static updatePerson (config: { unfilteredFields: string[], data: any, user: number }) {
    return this.updateNode(Object.assign({}, this.PersonConfig, config))
  }
  public static deletePerson (config: { unfilteredFields: string[], id: number, user: number }) {
    return this.deleteNode(Object.assign({}, this.PersonConfig, config))
  }
  public static restorePerson (config: { unfilteredFields: string[], id: number, user: number }) {
    return this.restoreNode(Object.assign({}, this.PersonConfig, config))
  }
  public static async getPersonContactsCount (config: EdgesCountConfig) {
    return this.getEdgesCount(Object.assign({}, config, this.PersonContactsConfig))
  }
  public static getPersonContactsEdges (config: EdgesConfig) {
    return this.getEdges(Object.assign({}, config, this.PersonContactsConfig))
  }
  public static getPhone (config) {
    return this.getEdge(Object.assign({}, this.PersonContactsConfig, config))
  }
  public static async createContact (config: CreateNodeMutationConfig) {
    console.log(config.data)
    const CreateContactResponse = await ContactsService.createContact({
      unfilteredFields: Object.keys(config.data.input),
      data: config.data.input,
      user: config.user
    })
    console.log(CreateContactResponse)
    if (CreateContactResponse && CreateContactResponse.id > 0) {
      const PersonContactEdgeData = {
        source: config.data.input.person,
        node: CreateContactResponse.id
      }
      const CreatePersonContactEdgeResponse = await PersonsService.createEdge({
        unfilteredFields: Object.keys(config.data.input),
        data: PersonContactEdgeData,
        user: config.user
      })
      console.log(CreatePersonContactEdgeResponse)
      if (CreatePersonContactEdgeResponse && CreatePersonContactEdgeResponse.id > 0) return CreatePersonContactEdgeResponse
      else return null
    }
    else return null
  }
}

export const ps = new PersonsService()