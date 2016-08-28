'use strict';

module.exports = class Organization {
  constructor(data) {
    let messages = {};
    let organization = {};
    if (data) {
      if (data.bin) {
        if (data.bin
          && typeof data.bin === 'string'
          && data.bin.length === 12) {
          organization.bin = data.bin;
        } else {
          messages.bin = `incorrect 'bin': ${data.bin}`;
        }
      } else {
        organization.bin = '';
      }
      if (data.shortName) {
        if (data.shortName
        && typeof data.shortName === 'string'
        && data.shortName.length > 1
        && data.shortName.length <= 1000) {
          organization.shortName = data.shortName;
        } else {
          messages.shortName = `incorrect 'shortName': ${data.shortName}`;
        }
      } else {
        messages.shortName = `'shortName' is required`;
      }
      if (data.officialName) {
        if (data.officialName
        && typeof data.officialName === 'string'
        && data.officialName.length > 1
        && data.officialName.length <= 4000) {
          organization.officialName = data.officialName;
        } else {
          messages.officialName = `incorrect 'officialName': ${data.officialName}`;
        }
      } else {
        organization.officialName = '';
      }
    } else {
      messages.organization = `'organization' is required`;
    }
    if (Object.keys(messages).length > 0) {
      return this.messages = messages;
    } else {
      return this.organization = organization;
    }
  }
}
