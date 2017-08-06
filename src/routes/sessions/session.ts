import { Entity } from './../../models/entity';

export class Session extends Entity {
  public static sessions: Session[];
  constructor (
    public eUserID: number,
    public aToken: string,
    public openedAt?: number,
    public closedAt?: number,
    public dSessionStateID?: number
  ) {
    super()
  }
}