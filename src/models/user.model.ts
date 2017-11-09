import { State } from './state.model';
export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  roles: Role[] = [];
  state: State;
  isDeleted: boolean;
  createdAt: string;
  constructor(data: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    roles: Role[];
    state: State;
    isDeleted: boolean;
    createdAt: string;
  }
  ) {
    this.id = Number(data.id);
    this.username = String(data.username);
    this.firstName = String(data.firstName);
    this.lastName = String(data.lastName);
    this.middleName = String(data.middleName || '');
    data.roles.forEach(role => this.roles.push(new Role(role)));
    this.state = new State(data.state);
    this.isDeleted = Boolean(data.isDeleted);
    this.createdAt = String(data.createdAt);
  }
}
class Role {
  id: number;
  nameEn: string;
  descEn?: string;
  nameKz: string;
  descKz?: string;
  nameRu: string;
  descRu?: string;
  isDeleted: boolean;
  constructor(data: {
    id: number;
    nameEn: string;
    descEn?: string;
    nameKz: string;
    descKz?: string;
    nameRu: string;
    descRu?: string;
    isDeleted: boolean;
  }) {
    this.id = Number(data.id);
    this.nameEn = String(data.nameEn);
    this.descEn = String(data.descEn);
    this.nameKz = String(data.nameKz);
    this.descKz = String(data.descKz);
    this.nameRu = String(data.nameRu);
    this.descRu = String(data.descRu);
    this.isDeleted = Boolean(data.isDeleted);
  }
}

