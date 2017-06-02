'use strict';

const validator = require('./../../common/validator');

module.exports = class Person {
  /**
   * @param person
   * @return person || messages
   */
  constructor(data) {
    let person = {};
    let messages = {};
    let result = {};
    if (!data || !typeof data === 'object') {
      messages.message = `'person' is required`;
      result.messages = messages;
      return this.result = result;
    } else if (Object.getOwnPropertyNames(data).length === 0) {
      messages.message = `'person data' is required`;
      result.messages = messages;
      return this.result = result;
    } else {
      if (data.aPersonIIN || data.aPersonIIN === undefined) {
        let result = validator.isIIN(data.aPersonIIN, null);
        result.result ?
        person.aPersonIIN = result.data : messages.aPersonIIN = result.data;
      }
      if (data.aPersonLastName || data.aPersonLastName === undefined) {
        let result = validator.isString(data.aPersonLastName, 2, 100, null);
        result.result ?
        person.aPersonLastName = result.data : messages.aPersonLastName = result.data;
      }
      if (data.aPersonFirstName || data.aPersonFirstName  === undefined) {
        let result = validator.isString(data.aPersonFirstName, 2, 100, null);
        result.result ?
        person.aPersonFirstName = result.data : messages.aPersonFirstName = result.data;
      }
      if (data.aPersonMiddleName || data.aPersonMiddleName  === undefined) {
        let result = validator.isString(data.aPersonMiddleName, 2, 100, null);
        result.result ?
        person.aPersonMiddleName = result.data : messages.aPersonMiddleName = result.data;
      }
      if (data.aPersonDOB || data.aPersonDOB === undefined) {
        let result = validator.isValidDate(data.aPersonDOB, null);
        result.result ?
        person.aPersonDOB = result.data : messages.aPersonDOB = result.data;
      }
      if (data.aPersonGenderID || data.aPersonGenderID === undefined) {
        let result = validator.isValidChar(data.aPersonGenderID, 'M', 'F', null);
        result.result ?
        person.aPersonGenderID = result.data : messages.aPersonGenderID = result.data;
      }
      if (Object.keys(messages).length > 0) {
        result.messages = messages;
        return this.result = result;
      } else {
        if (person.aPersonIIN === ''
          && person.aPersonLastName === ''
          && person.aPersonFirstName === ''
          && person.aPersonMiddleName === ''
          && person.aPersonDOB === null
          && person.aPersonGenderID === 'N') {
            messages.message = `'person data' is required`;
            result.messages = messages;
            return this.result = result;
        }
        result.person = person;
        return this.result = result;
      }
    }
  }
}
