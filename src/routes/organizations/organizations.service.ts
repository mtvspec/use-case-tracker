import { DatabaseService } from './../../services/database.service/database.service';

import { OrganizationsQueries } from './organizations.queries';
import { DataValidationService } from './../../common';

export class OrganizationsService extends DatabaseService {
  public getAllOrganizations () {
    return this.selectAllRecords({ text: OrganizationsQueries.organizations.selectAllOrganizations() });
  }
  public getOrganization (id: number) {
    return this.selectRecord({ text: OrganizationsQueries.organizations.selectOrganization(id) });
  }
  public createOrganization (organization) {
    /**
     * Organization
     * @param { String } aOrganizationBin             - length: 12
     * @param { String } aOrganizationShortName       - required, minlen: 1, maxlen: 1000
     * @param { String } aOrganizationOfficialName    - minlen: 1, maxlen: 4000
     */
    // if (organization.aOrganizationBin) if (DataValidationService.validateBin(organization.aOrganizationBin) === false) return new Response(400, 'Invalid bin');
    // if (DataValidationService.validateString(organization.aOrganizationShortName, 1, 1000) === false) return new Response(400, 'invalid short name');
    // if (organization.aOrganizationOfficialName) if (DataValidationService.validateString(organization.aOrganizationOfficialName, 1, 4000) === false) return new Response(400, 'invalid official name');
    return this.insertRecord({ text: OrganizationsQueries.organizations.INSERT_ORGANIZATION(organization) });
  }
}

class Response {
  constructor(
    private status: number = 200,
    private data: any = {}
  ) { }
}

class ErrorMessage {
  constructor(
    private message: string
  ) { }
}

class ErrorMessages {
  messages: ErrorMessage[];
  constructor(
    private message: ErrorMessage
  ) { this.messages.push(message) }
}
