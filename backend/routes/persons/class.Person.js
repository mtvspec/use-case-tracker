'use strict';
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
    }
    if (data.iin) {
      if (isString(data.iin, 12, 12)) {
        person.iin = String(data.iin);
      } else {
        return messages.iin = `incorrect 'iin': ${data.iin}`
      }
    } else {
      person.iin = null;
    }
    if (data.lastName) {
      if (isString(data.lastName, 1, 400)) {
        person.lastName = String(data.lastName);
      } else {
        messages.lastName = `incorrect 'lastName': ${data.lastName}`;
      }
    } else {
      person.lastName = null;
    }
    if (data.firstName) {
      if (isString(data.firstName, 1, 300)) {
        person.firstName = String(data.firstName);
      } else {
        result.firstName = `incorrect 'firstName': ${data.firstName}`;
      }
    } else {
      person.firstName = null;
    }
    if (data.middleName) {
      if (isString(data.middleName, 1, 500)) {
        person.middleName = String(data.middleName);
      } else {
        messages.middleName = `incorrect 'middleName': ${data.middleName}`;
      }
    } else {
      person.middleName = null;
    }
    if (data.dob) {
      if (new Date(data.dob).getTime() > 0) {
        person.dob = data.dob;
      } else {
        messages.dob = `incorrect 'dob': ${data.dob}`;
      }
    }
    if (data.gender) {
      if (typeof data.gender === 'string'
      && data.gender.length === 1
      && (data.gender === 'M' || data.gender === 'F')) {
        person.gender = String(data.gender);
      } else {
        messages.gender = `incorrect 'gender': ${data.gender}`;
      }
    } else {
      person.gender = null;
    }
    if (Object.keys(messages).length > 0) {
      result.messages = messages;
      return this.result = result;
    } else {
      if (person.iin === null
        && person.lastName === null
        && person.firstName === null
        && person.middleName === null
        && person.dob === null
        && person.gender === null) {
          result.message = `'person data' is required`;
          return this.result = result;
      }
      result.person = person;
      return this.result = result;
    }
  }
}

function isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    let parts = dateString.split('-');
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function isString(string, minLength, maxLength) {
  if (!string) {
    return false;
  } else if (
    typeof string === 'string'
    && string.length >= minLength
    && string.length <= maxLength
  ) {
    return true;
  } else {
    return false;
  }
}
