import { DatabaseService, ServiceConfig } from './../database.service'
import { NodeConfig, NodesConfig } from '../interfaces'
export default class ContactsService extends DatabaseService {
  private static ContactsConfig: ServiceConfig = {
    table: '',
    tableFields: []
  }
  constructor() {
    super()
    async function getContactTableFields (table: string) {
      ContactsService.ContactsConfig.table = table
      const response: string[] = await DatabaseService.fields(table) as string[]
      if (response && response.length > 0) ContactsService.ContactsConfig.tableFields = response
      else console.trace(response)
    }
    getContactTableFields('contacts.e_contact')
  }
  public static getContact (config: NodeConfig) {
    return this.getNode(Object.assign({}, ContactsService.ContactsConfig, config))
  }
  public static getContacts (config: NodesConfig) {
    return this.getNodes(Object.assign({}, ContactsService.ContactsConfig, config))
  }
  public static createContact (config: { unfilteredFields: string[], data: any, user: number }) {
    return this.createNode(Object.assign({}, ContactsService.ContactsConfig, config))
  }
  public static updateContact (config: { unfilteredFields: string[], target: { [key: string]: any }, data: any, user: number }) {
    return this.updateNode(Object.assign({}, ContactsService.ContactsConfig, config))
  }
  public static deleteContact (config: { unfilteredFields: string[], id: number, user: number }) {
    return this.deleteNode(Object.assign({}, ContactsService.ContactsConfig, config))
  }
}

const cs = new ContactsService()