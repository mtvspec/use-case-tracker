import { Entity } from './entity.model';
import { State } from './state.model';
export class Contact {
  public contactType?: State | null;
  public value: string;
  public state: State;
  public isDeleted: boolean;
  public createdAt: string;
  constructor(data: {
    contactType?: State | null;
    state: State;
    value: string;
    isDeleted: boolean;
    createdAt: string;
  }) {
    this.contactType = data.contactType ? new State(data.contactType) : null;
    this.value = data.value;
    this.state = new State(data.state);
    this.isDeleted = data.isDeleted;
    this.createdAt = data.createdAt;
  }
}

export interface IUser {
  user: {
    id: number
  }
}

export interface ICreateContact extends IUser {
  personID: number
  contactTypeID: number
  contact: string
}

export interface IUpdateContact extends IUser {
  id: number
  contactTypeID: number
  contact: string
}

export interface IDeleteContact extends IUser {
  id: number
}