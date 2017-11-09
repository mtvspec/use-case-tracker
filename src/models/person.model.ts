import { Entity } from './entity.model';
import { Contact } from './contact.model';
import { State } from './state.model';
import { User } from './user.model';

interface IEmployee {
  employees: {
    manager: {
      person: {
        firstName
        middleName
        lastName
      }
    }
  }
}

export class Person extends Entity {
  public iin?: string | null;
  public firstName: string;
  public lastName?: string | null;
  public middleName?: string | null;
  public dob?: string | null;
  public gender?: State | null;
  contactsCount: number;
  public contacts: Contact[] = [];
  public employee: IEmployee
  constructor(data: {
    id: number;
    iin?: string | null;
    firstName: string;
    lastName?: string | null;
    middleName?: string | null;
    dob?: string | null;
    gender?: State | null;
    contacts: Contact[];
    state: State;
    isDeleted: boolean;
    createdBy: User;
    createdAt: string;
    updatedBy?: User | null;
    updatedAt?: string | null;
    deletedBy?: User | null;
    deletedAt?: string | null;
    modifiedBy: User;
    modifiedAt: string;
  }) {
    super(data);
    this.iin = data.iin ? String(data.iin) : null;
    this.lastName = data.lastName ? String(data.lastName) : null;
    this.firstName = String(data.firstName);
    this.middleName = data.middleName ? String(data.middleName) : null;
    this.dob = data.dob ? String(data.dob) : null;
    this.gender = data.gender ? new State(data.gender) : null;
    if (data.contacts) data.contacts.forEach(contact => this.contacts.push(new Contact(contact)));
  }
}

export interface IUser {
  user: {
    id
  }
}

export interface ICreatePerson extends IUser {
  iin?: string
  firstName: string
  lastName?: string
  middleName?: string
  dob?: string
  genderID?: number
}

export interface IUpdatePerson extends ICreatePerson {
  id: number
}

export interface IDeletePerson extends IUser {
  id: number
}