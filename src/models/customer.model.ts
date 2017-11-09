
import { Entity } from './entity.model';
import { Organization } from './organization.model';
import { State } from './state.model';
import { User } from './user.model';
export class Customer extends Entity implements ICustomer {
  organization: Organization;
  name: string;
  description?: string | null;
  constructor(data: {
    id: number;
    organization: Organization;
    name: string;
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
  }) {
    super(data)
    this.organization = new Organization(data.organization);
    this.name = String(data.name);
    this.description = data.description ? String(data.description) : null;
  }
}

export interface ICustomer {
  id: number;
  organization
  name: string;
  description?: string | null;
}