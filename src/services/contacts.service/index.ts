const CONTACTS_TABLE: string = 'contacts.e_contact'
const PERSON_CONTACT_EDGES_TABLE: string = 'persons.r_e_person_e_contact'
import {
  DatabaseService
} from './../database.service'

let contactsTableFields: string[] = []
let personContactEdgesTableFields: string[] = []

export default class ContactsService extends DatabaseService {
  public static async getContact (fields: string[], id: number) {
    return this.getNode(
      CONTACTS_TABLE,
      contactsTableFields,
      fields,
      id
    )
  }
  public static async getContacts (fields: string[]) {
    this.getNodes(
      CONTACTS_TABLE,
      contactsTableFields,
      fields
    )
  }
  public static async createContact (data: any, user: number) {
    const createContactResponse: any = await this.createNode(
      CONTACTS_TABLE,
      contactsTableFields,
      data,
      user
    )
    if (createContactResponse && createContactResponse.id > 0) {
      const personContactEdgeData = Object.assign({},
        { source: data.input.person },
        { node: createContactResponse.id },
        data.input
      )
      const createPersonContactEdgeResponse: any = await this.createEdge(
        PERSON_CONTACT_EDGES_TABLE,
        personContactEdgesTableFields,
        personContactEdgeData,
        user
      )
      if (createPersonContactEdgeResponse && createPersonContactEdgeResponse.id > 0)
        return createContactResponse
      else
        return new Error(`Person contact not created`)
    } else {
      return new Error(`Contact not created`)
    }
  }
  public static async updateContact (data: any, user: number) {
    return this.updateNode(
      CONTACTS_TABLE,
      contactsTableFields,
      data,
      user
    )
  }
  public static async deleteContact (id: number, user: number) {
    return this.deleteNode(
      CONTACTS_TABLE,
      id,
      user
    )
  }
}
const getContactTableFields = (async () => {
  const response: any = await <any>ContactsService.fields(CONTACTS_TABLE)
  if (response && response.length > 0) contactsTableFields = response
  else console.trace(response)
})()
const getPersonContactEdgesTableFields = (async () => {
  const response: any = await <any>ContactsService.fields(PERSON_CONTACT_EDGES_TABLE)
  if (response && response.length > 0) personContactEdgesTableFields = response
  else console.trace(response)
})()