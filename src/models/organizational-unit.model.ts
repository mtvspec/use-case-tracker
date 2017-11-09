import { Entity } from './entity.model';
import { State } from './state.model';
import { User } from './user.model';
import { Organization } from './organization.model';

export class OrganizationalUnit extends Entity {
  organization?: Organization | null;
  kind?: State | null;
  type?: State | null;
  name: string;
  description?: string | null;
  constructor(data: {
    id: number;
    organization?: Organization | null;
    kind?: State | null;
    type?: State | null;
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
    data.organization ? this.organization = new Organization(data.organization) : null;
    this.kind = data.kind ? new State(data.kind) : null;
    this.type = data.type ? new State(data.type) : null;
    this.name = String(data.name);
    this.description = data.description ? String(data.description) : null;
  }
}
