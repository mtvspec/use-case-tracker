import { ICreatePerson, IUpdatePerson, IDeletePerson } from './../../models/person.model';
import { ICreateContact, IUpdateContact, IDeleteContact } from './../../models/contact.model';
import queries from './queries';
import db from './../../knex'
const totalCount: string = 'id as totalCount'
const personsTable: string = 'persons.e_person'
const personContactsTable: string = 'persons.e_contact'
import {
  DatabaseService, QueryConfig
} from './../database.service'
import { fail } from 'assert';

let personTableFields = []

export class PersonsService extends DatabaseService {
  personTableFields: any[]
  private static async getTableFields () {
    return await this.query(new QueryConfig({
      qty: 1,
      text: 'SELECT * FROM persons.e_person LIMIT 1;'
    }))
  }
  public static async getPersonsCount () {
    return await db
      .from(personsTable)
      .count(totalCount).first()
  }
  public static async getPersonsCountByRecordState (isDeleted: boolean) {
    return await db
      .from(personsTable)
      .where({ isDeleted })
      .count(totalCount).first()
  }
  public static async getPersons (fields: any) {
    const filterFields = (field) => { return (personTableFields.indexOf(field) > -1) }
    const filteredFields = fields.filter(filterFields)
    return await db
      .select(filteredFields)
      .from(personsTable)
      .orderBy('lastName', 'firstName', 'middleName')
  }
  public static async searchPersons (fields: any, value: string) {
    const filterFields = (field) => { return (personTableFields.indexOf(field) > -1) }
    const filteredFields = fields.filter(filterFields)
    // return await this.query(new QueryConfig({
    //   qty: '*',
    //   text: queries.persons.SEARCH_PERSONS(value)
    // }))
    return await db
      .select(filteredFields)
      .from(personsTable)
      .whereRaw(`"isDeleted" = false and lower(concat("lastName", ' ', "firstName", ' ', "middleName", ' ', "iin")) ~ lower('\\m${value}')`)
      .orderBy('lastName', 'firstName', 'middleName')
  }
  public static async getPersonsByRecordState (fields: any, isDeleted: boolean) {
    const filterFields = (field) => { return (personTableFields.indexOf(field) > -1) }
    const filteredFields = fields.filter(filterFields)
    return await db
      .select(filteredFields)
      .from(personsTable)
      .where({ isDeleted })
      .orderBy('lastName', 'firstName', 'middleName')
  }
  public static async getPersonsByGenderID (genderID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.persons.GET_PERSONS_BY_GENDER_ID(genderID)
    }))
  }
  public static async getPerson (unfilteredFiels: any, id: number) {
    const filterFields = (field) => { return (personTableFields.indexOf(field) > -1) }
    const filteredFields = unfilteredFiels.filter(filterFields)
    return await db
      .select(filteredFields)
      .from(personsTable)
      .where({ id }).first()
  }
  public static async createPerson (data: ICreatePerson) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.INSERT_PERSON(data)
    }))
  }
  public static async updatePerson (data: IUpdatePerson) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.UPDATE_PERSON(data)
    }))
  }
  public static async deletePerson (data: IDeletePerson) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.DELETE_PERSON(data)
    }))
  }
  public static async getPersonsContactsCount (personID: number) {
    return await db
      .count(totalCount).first()
      .from(personContactsTable)
      .where({ personID })
  }
  public static async getContacts (personID: number) {
    return await this.query(new QueryConfig({
      qty: '*',
      text: queries.persons.GET_PERSON_CONTACTS(personID)
    }))
  }
  public static async getContact (contactID: number) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.GET_PERSON_CONTACT(contactID)
    }))
  }
  public static async createContact (data: ICreateContact) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.INSERT_CONTACT(data)
    }))
  }
  public static async updateContact (data) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.UPDATE_CONTACT(data)
    }))
  }
  public static async deleteContact (data: IDeleteContact) {
    return await this.query(new QueryConfig({
      qty: 1,
      text: queries.persons.DELETE_CONTACT(data)
    }))
  }
}

const getFields = (async () => {
  const response: any = await <any>PersonsService.fields(personsTable)
  response.forEach((field: any) => personTableFields.push(field.name))
})()
