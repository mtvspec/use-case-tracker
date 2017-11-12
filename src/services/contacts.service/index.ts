import db from './../../knex'
const CONTACTS_TABLE: string = 'contacts.e_contact'
import {
  DatabaseService
} from './../database.service'
import { field } from '../../utils/index'
import { ICreateContact, IUpdateContact } from '../../models/contact.model'

let contactsTableFields: field[] = []

export default class ContactsService extends DatabaseService {
  public static async getContact (fields: field[], id: number) {
    return this.getNode(
      CONTACTS_TABLE,
      contactsTableFields,
      fields,
      id
    )
  }
  public static async getContacts (fields: field[]) {
    this.getNodes(
      CONTACTS_TABLE,
      contactsTableFields,
      fields
    )
  }
  public static async createContact (data: ICreateContact, user: number) {
    return this.createNode(
      CONTACTS_TABLE,
      data,
      user
    )
  }
  public static async updateContact (data: IUpdateContact, user: number) {
    return this.updateNode(
      CONTACTS_TABLE,
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

const getFields = (async () => {
  const response: any = await <any>ContactsService.fields(CONTACTS_TABLE)
  response.forEach((field: any) => contactsTableFields.push(field.name))
})()