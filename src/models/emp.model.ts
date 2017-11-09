import { Entity } from './entity.model';
import { State } from './state.model';
import { User } from './user.model';
import { Person } from './person.model';
import { PositionalUnit } from './positional-unit.model';
export class Employee extends Entity {
  person: Person;
  positionalUnit: PositionalUnit;
  salary?: number | null;
  constructor(data: {
    id: number;
    person: Person;
    salary?: number | null;
    positionalUnit: PositionalUnit;
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
    this.person = new Person(data.person);
    this.positionalUnit = new PositionalUnit(data.positionalUnit);
    this.salary = data.salary ? Number(data.salary) : null;
  }
}

