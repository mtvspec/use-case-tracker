'use strict';

const validator = require('./../../common/validator');

module.exports = class UseCaseSubject {
  constructor(data) {
    console.log(data);
    let messages = {};
    let useCaseSubject = {};
    let result = {};
    if (!data || !typeof data === 'object') {
      messages.message = `'use-case subject' is required`;
      result.messages = messages;
      return this.result = result;
    } else if (Object.getOwnPropertyNames(data).length === 0) {
      messages.message = `'use-case subject data' is required`;
      result.messages = messages;
      return this.result = result;
    } else {
      if (data.eComponentID || data.eComponentID === undefined) {
        let result = validator.isNumber(data.eComponentID, 'not null');
        result.result ?
        useCaseSubject.eComponentID = result.data : messages.eComponentID = result.data;
      }
      if (data.aUseCaseSubjectName || data.aUseCaseSubjectName === undefined) {
        let result = validator.isString(data.aUseCaseSubjectName, 2, 1000, 'not null');
        result.result ?
        useCaseSubject.aUseCaseSubjectName = result.data : messages.aUseCaseSubjectName = result.data;
      }
      if (data.aUseCaseSubjectDesc || data.aUseCaseSubjectDesc === undefined) {
        let result = validator.isString(data.aUseCaseSubjectDesc, 2, null, 'not null');
        result.result ?
        useCaseSubject.aUseCaseSubjectDesc = result.data : messages.aUseCaseSubjectDesc = result.data;
      }
      console.log(useCaseSubject);
      if (Object.keys(messages).length > 0) {
        result.messages = messages;
        return this.result = result;
      } else if (!Object.keys(useCaseSubject).length === 3) {
        console.log(true);
        messages.useCaseSubject = `'useCaseSubject data' is required`;
        result = messages;
        return result = result;
      } else {
        result.useCaseSubject = useCaseSubject;
        return result = result;
      }
    }
  }
}
