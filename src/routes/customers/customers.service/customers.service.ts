import { DatabaseService } from './../../../services/database.service/database.service';
import { CustomersQueries } from './customers.queries';

export class CustomersService extends DatabaseService {
  public getAllCustomers () {
    return this.selectAllRecords({ text: CustomersQueries.customers.selectAllCustomers });
  }
}
