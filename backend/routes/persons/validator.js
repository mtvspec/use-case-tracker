'use strict';

function isID(id) {
  if (id && typeof +id === 'number' && Number.isInteger(+id)) {
    return true;
  } else {
    return false;
  }
}

function isPerson(data, cb) {
  let person = {};
  let messages = {};
  if (data) {
    if (data.iin) {
      if (isIIN(data.iin)) {
        person.iin = data.iin;
      } else {
        messages.iin = 'Incorrect iin';
      }
    }
    if (data.lastName) {
      if (isLastOrFirstName(data.lastName)) {
        person.lastName = data.lastName;
      } else {
        messages.lastName = 'Incorrect lastName';
      }
    }
    if (data.firstName) {
      if (isLastOrFirstName(data.firstName)) {
        person.firstName = data.firstName;
      } else {
        messages.firstName = 'Incorrect firstName';
      }
    }
    if (data.middleName) {
      if (isMiddleName(data.middleName)) {
        person.middleName = data.middleName;
      } else {
        messages.middleName = 'Incorrect middleName';
      }
    }
    if (data.dob) {
      if (isValidDate(data.dob)) {
        person.dob = data.dob;
      } else {
        messages.dob = 'Incorrect dob';
      }
    }
    if (data.gender) {
      if (isGender(data.gender)) {
        person.gender = data.gender;
      } else {
        messages.gender = 'Incorrect gender';
      }
    }
    if (messages.hasOwnProperties) {
      return cb(false, messages);
    } else {
      return cb(true, person);
    }
  } else {
    return cb(false);
  }
}

function isIIN(iin) {
  if (iin
    && typeof iin === 'string'
    && iin.length === 12
    && Number.isInteger(Number(iin))) {
    return true;
  } else {
    return false;
  }
}

function isLastOrFirstName(string) {
  if (string
  && validator.isAlpha(string, 'ru-RU')
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 200) {
    return true;
  } else {
    return false;
  }
}

function isMiddleName(string) {

  if (string
  && validator.isAlpha(string, 'ru-RU')
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 300) {
    return true;
  } else {
    return false;
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

function isGender(gender) {
  if (gender
  && typeof gender === 'string'
  && gender.length === 1
  && (gender === 'M' || gender === 'F')) {
    return true;
  } else {
    return false;
  }
}

module.exports = isID;
module.exports = isPerson;
