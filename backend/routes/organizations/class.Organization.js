'use strict';

const validator = require('./../../common/validator');

module.exports = class Organization {
  constructor(data) {
    console.log(data);
    let messages = {};
    let organization = {};
    let result = {};
    if (!data || !typeof data === 'object') {
      messages.message = `'organization' is required`;
      result.messages = messages;
      return this.result = result;
    } else if (Object.getOwnPropertyNames(data).length === 0) {
      messages.message = `'organization data' is required`;
      result.messages = messages;
      return this.result = result;
    } else {
      if (data.aOrganizationBin || data.aOrganizationBin === undefined) {
        let result = validator.isIIN(data.aOrganizationBin, null);
        result.result ?
        organization.aOrganizationBin = result.data : messages.aOrganizationBin = result.data;
      }
      if (data.aOrganizationShortName || data.aOrganizationShortName === undefined) {
        let result = validator.isString(data.aOrganizationShortName, 2, 100, null);
        result.result ?
        organization.aOrganizationShortName = result.data : messages.aOrganizationShortName = result.data;
      }
      if (data.aOrganizationOfficialName || data.aOrganizationOfficialName  === undefined) {
        let result = validator.isString(data.aOrganizationOfficialName, 2, 100, null);
        result.result ?
        organization.aOrganizationOfficialName = result.data : messages.aOrganizationOfficialName = result.data;
      }
      console.log(organization);
      console.log(messages);
      if (Object.keys(messages).length > 0) {
        result.messages = messages;
        return this.result = result;
      } else {
        if (organization.aOrganizationBin === ''
          && organization.aOrganizationShortName === ''
          && organization.aOrganizationOfficialName === ''
          ) {
            messages.message = `'organization data' is required`;
            result.messages = messages;
            return this.result = result;
        }
        result.organization = organization;
        return this.result = result;
      }
    }
  }
}
