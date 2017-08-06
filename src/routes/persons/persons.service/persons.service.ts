import { DatabaseService } from './../../../services/database.service/database.service';
import { PersonsQueries } from './persons.queries';

import * as validator from 'validator';

import { Person } from './../person';

export class PersonsService extends DatabaseService {
  public getAllPersons () {
    return this.selectAllRecords({ text: PersonsQueries.persons.selectAllPersons() });
  }
  public getPerson (id: number) {
    return this.selectRecord({ text: PersonsQueries.persons.selectPersonByID(+id) });
  }
  public createPerson (person: Person) {
    return this.insertRecord({ text: PersonsQueries.persons.insertPerson(person) });
  }
  public updatePerson (person: Person) {
    return this.updateRecord({ text: PersonsQueries.persons.updatePerson(person) });
  }
  public deletePerson (id: number) {
    return this.updateRecord({ text: PersonsQueries.persons.deletePerson(+id) });
  }
}
