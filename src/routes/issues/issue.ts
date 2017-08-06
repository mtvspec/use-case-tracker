import { Entity } from './../../models/entity';
export class Issue extends Entity {
  constructor(
    public title: string,
    public description?: string
  ) {
    super();
    this.title = title;
    if (typeof description === 'string') this.description = description;
    else this.description = '';
    return this;
  }
}

let issue = new Issue('New issue');

console.log(issue);
