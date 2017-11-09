import { Entity } from './entity.model';

import { Person } from './person.model';
import { State } from './state.model';
import { User } from './user.model';

export class Issue extends Entity {
  public author?: Person | null;
  public typeID: number | null;
  public title: string;
  public description?: string | null;
  constructor(data: {
    id: number;
    author?: Person | null;
    typeID?: number | null;
    title: string;
    description?: string | null;
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
  }
  ) {
    super(data);
    this.author = data.author ? new Person(data.author) : null;
    this.typeID = Number(data.typeID) || null;
    this.title = String(data.title);
    this.description = data.description ? String(data.description) : null;
  }
}

export interface IIssue {
  title: string;
  description?: string;
}