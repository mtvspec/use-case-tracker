'use strict';

module.exports = class Person {
  constructor(data) {
    let person = {};
    let messages = {};
    if (data) {
      if (data.iin) {
        if (typeof data.iin === 'string'
        && data.iin.length === 12) {
          person.iin = data.iin;
        } else {
          messages.iin = `incorrect 'iin': ${data.iin}`;
        }
      } else {
        person.iin = '';
      }
      if (data.lastName) {
        if (typeof data.lastName === 'string'
        && data.lastName.length > 1
        && data.lastName.length <= 400) {
          person.lastName = data.lastName;
        } else {
          messages.lastName = `incorrect 'lastName': ${data.lastName}`;
        }
      } else {
        messages.lastName = `'lastName' is required`;
      }
      if (data.firstName) {
        if (typeof data.firstName === 'string'
        && data.firstName.length > 1
        && data.firstName.length <= 300) {
          person.firstName = data.firstName;
        } else {
          messages.firstName = `incorrect 'firstName': ${data.firstName}`;
        }
      } else {
        messages.firstName = `'firstName' is required`;
      }
      if (data.middleName) {
        if (typeof data.middleName === 'string'
        && data.middleName.length > 1
        && data.middleName.length <= 500) {
          person.middleName = data.middleName;
        } else {
          messages.middleName = `incorrect 'middleName': ${data.middleName}`;
        }
      } else {
        person.middleName = '';
      }
      if (data.dob) {
        if (isValidDate(data.dob)) {
          person.dob = data.dob;
        } else {
          messages.dob = `incorrect 'dob': ${data.dob}`;
        }
      } else {
        person.dob = '';
      }
      if (data.gender) {
        if (typeof data.gender === 'string'
        && data.gender.length === 1
        && (data.gender === 'M' || data.gender === 'F')) {
          person.gender = data.gender;
        } else {
          messages.gender = `incorrect 'gender': ${data.gender}`;
        }
      } else {
        messages.gender = `'gender' is required`;
      }
      if (Object.keys(messages).length > 0) {
        return this.messages = messages;
      } else {
        return this.person = person;
      }
    } else {
      messages.person = `'person' is required`;
      return this.messages = messages;
    }
  }
}

function isValidDate(dateString)
{
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
