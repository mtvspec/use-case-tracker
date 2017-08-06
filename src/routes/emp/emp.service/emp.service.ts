import { DatabaseService } from './../../../services/database.service/database.service';
import { EmpQueries } from './emp.queries';

export class EmpService extends DatabaseService {
  public getAllEmp () {
    return this.selectAllRecords({ text: EmpQueries.emp.selectAllEmp });
  }
}
