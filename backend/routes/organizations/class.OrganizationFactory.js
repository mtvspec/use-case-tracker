'use strict';

module.exports = class OrganizationFactory {
  constructor(organization) {
    let validationResult = validate(organization);
    if (validationResult.result) {
      this.organization = validationResult.data;
    } else {
      this.messages = validationResult.data;
    }
  }
}

function validate (data) {
  if (data) {
    let messages = {};
    let organization = {};
    let validationResult = {};

    data.bin ?
      (isValidBIN(data.bin) ?
        organization.bin = data.bin :
          messages.bin = `incorrect 'bin': ${data.bin}`) :
            organization.bin = ''

    data.shortName ?
      (isValidShortName(data.shortName) ?
        organization.shortName = data.shortName :
          messages.shortName = `incorrect 'shortName': ${data.shortName}`) :
            messages.shortName = `'shortName' is required`

    data.officialName ?
      (isValidOfficialName(data.officialName) ?
        organization.officialName = data.officialName :
        messages.officialName = `incorrect 'officialName': ${data.officialName}`) :
            organization.officialName = ''

    Object.keys(messages).length > 0 ?
      validationResult = {
        result: false,
        data: messages
      } :
        validationResult = {
          result: true,
          data: organization
        };

    return validationResult;
  } else {
    throw Error(`organization is required`);
  }
}

function isValidBIN(bin) {
  if (bin
    && typeof bin === 'string'
    && bin.length === 12) {
    return true;
  } else {
    return false;
  }
}

function isValidShortName (shortName) {
  if (shortName
  && typeof shortName === 'string'
  && shortName.length > 1
  && shortName.length <= 1000) {
    return true;
  } else {
    return false;
  }
}

function isValidOfficialName (officialName) {
  if (officialName
  && typeof officialName === 'string'
  && officialName.length > 1
  && officialName.length <= 4000) {
    return true;
  } else {
    return false;
  }
}
