'use strict';

const validator = require('./../../common/validator');

module.exports = class System {
  /**
   * @param aSystemKindID
   * @param aSystemTypeID
   * @param aSystemName
   * @param aSystemDesc
   * @return system || messages
   */
  constructor(data) {
    let result = {};
    let messages = {};
    let system = {};
    if (!data || !typeof data === 'object') {
      messages.message = `'system' is required`;
      result.messages = messages;
      return this.result = result;
    } else if (Object.getOwnPropertyNames(data).length === 0) {
      messages.message = `'system data' is required`;
      result.messages = messages;
      return this.result = result;
    }
    if (data.aSystemKindID) {
      let result = validator.isNumber(data.aSystemTypeID);
      console.log(result);
      if (result.result) {
        system.aSystemKindID = result.data;
      } else {
        messages = result.data;
      }
    }
    if (data.aSystemTypeID) {
      let result = validator.isNumber(data.aSystemTypeID);
      if (result.result) {
        system.aSystemTypeID = result.data;
      } else {
        messages = result.data;
      }
    }
    if (data.aSystemName) {
      let result = validator.isString(data.aSystemName, 2, 1000, 'not null');
      if (result.result) {
        system.aSystemName = data.aSystemName;
      } else {
        messages = result.data;
      }
    }
    if (data.aSystemDesc) {
      let result = validator.isString(data.aSystemDesc, 2, null, null);
      if (result.result) {
        system.aSystemDesc = data.aSystemDesc;
      } else {
        messages = result.data;
      }
    }
    if (Object.keys(messages).length > 0) {
      result.messages = messages;
      return this.result = result;
    } else {
      if (Object.keys(system).length === 4) {
        result.system = system;
        return this.result = result;
      } else {
        result.messages = messages;
        return this.result = result;
      }
    }
  }
}

/**
 * @param value
 * @return true || false
 * datatype { number || float || string || char || boolean }
 * length { minLength || maxLength } - only for string
 * mandatory { not null || null }
*/

/**
 * @param [] = 0
 * @param {} = NaN
 * @param = NaN
 * @param '' = 0
 * @param null = 0
 * @param undefined = NaN
 * @param false = 0
 * @param true = 1
 */
