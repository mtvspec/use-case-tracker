export class Entity {
  constructor (
    public id?: number,
    public isDeleted?: boolean,
    public createdAt?: string,
    public updatedAt?: string
  ) {
    typeof id === 'number' ? this.id = id : this.id = 0;
    typeof isDeleted === 'boolean' ? this.isDeleted = isDeleted : this.isDeleted = false;
    typeof createdAt === 'string' ? this.createdAt = createdAt : this.createdAt = '';
    typeof updatedAt === 'string' ? this.updatedAt = updatedAt : this.updatedAt = '';
  }
}