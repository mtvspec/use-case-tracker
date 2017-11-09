import { Entity } from './entity.model';
import { State } from './state.model';
import { User } from './user.model';
export class Organization extends Entity {
  bin?: string | null;
  name: string;
  officialName?: string | null;
  constructor(data: {
    id: number;
    bin?: string | null;
    name: string;
    officialName?: string | null;
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
    this.bin = data.bin ? String(data.bin) : null;
    this.name = String(data.name);
    this.officialName = data.officialName ? String(data.officialName) : null;
  }
}
