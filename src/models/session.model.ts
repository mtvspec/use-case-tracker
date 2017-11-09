import { User } from './user.model';

export class Session {
  public id: number;
  public userID: number;
  public token: string;
  public openedAt: string;
  public closedAt?: string | null;
  public stateID: string;
  constructor(data: {
    id: number;
    userID: number;
    token: string;
    openedAt: string;
    closedAt?: string | null;
    stateID: string;
    isDeleted: boolean;
  }
  ) {
    this.id = Number(data.id);
    this.userID = Number(data.userID);
    this.token = String(data.token);
    this.openedAt = String(data.openedAt);
    this.closedAt = String(data.closedAt || null);
    this.stateID = String(data.stateID);
  }
}
