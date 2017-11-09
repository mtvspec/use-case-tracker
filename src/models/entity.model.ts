import { State } from './state.model';
import { User } from './user.model';
export class Entity {
  id: number;
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
  constructor(data: {
    id: number,
    state: State,
    isDeleted: boolean,
    createdBy: User,
    createdAt: string,
    updatedBy?: User | null,
    updatedAt?: string | null,
    deletedBy?: User | null,
    deletedAt?: string | null
    modifiedBy: User,
    modifiedAt: string
  }
  ) {
    this.id = Number(data.id);
    this.state = new State(data.state);
    this.isDeleted = Boolean(data.isDeleted);
    this.createdBy = new User(data.createdBy);
    this.createdAt = data.createdAt;
    this.updatedBy = data.updatedBy ? new User(data.updatedBy) : null;
    this.updatedAt = data.updatedAt || null;
    this.deletedBy = data.deletedBy ? new User(data.deletedBy) : null;
    this.deletedAt = data.deletedAt || null;
    this.modifiedBy = new User(data.modifiedBy);
    this.modifiedAt = data.modifiedAt;
  }
}

export interface IEntity {
  id: number;
  stateID: number;
  isDeleted: boolean;
  createdBy: number;
  createdAt: string;
  updatedBy?: number;
  updatedAt: string;
  deletedBy?: number;
  deletedAt: string;
  modifiedBy: number;
  modifiedAt: string;
}