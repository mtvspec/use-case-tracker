import { Entity } from './entity.model'

import { OrganizationalUnit } from './organizational-unit.model';
import { State } from './state.model';
import { User } from './user.model';

export class PositionalUnit extends Entity {
  organizationalUnit: OrganizationalUnit;
  name: string;
  description?: string | null;
  constructor(data: {
    id: number;
    organizationalUnit: OrganizationalUnit;
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
    super(data);
    this.organizationalUnit = new OrganizationalUnit(data.organizationalUnit);
    this.name = String(data.name);
    this.description = data.description ? String(data.description) : null;
  }
}
