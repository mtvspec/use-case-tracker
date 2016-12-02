'use strict';

module.exports = class validator {
  constructor() {

  }
  static isNumber(data, mandatory) {
    let result = {};
    let messages = {};
    if (typeof data === 'boolean') {
      messages.number = `'number' is required`;
      return result = {
        result: false,
        data: messages
      };
    }
    let number = Number(data);
    if (typeof number === 'number') {
      if (mandatory === null || mandatory === 'null') {
        if (!number) {
          return result = {
            result: true,
            data: null
          }
        } else {
          if (number < 1) {
            messages.number = `'number' must be more than 0`
            return result = {
              result: false,
              data: messages
            };
          }
          if (Number.isInteger(number)) {
            return result = {
              result: true,
              data: number
            };
          }
        }
      } else if (mandatory === 'not null') {
        if (number < 1) {
          messages.number = `'number' must be more than 0`
          return result = {
            result: false,
            data: messages
          };
        }
        if (Number.isInteger(number)) {
          return result = {
            result: true,
            data: number
          };
        } else {
          messages.number = `'number' is required`;
          return result = {
            result: false,
            data: messages
          }
        }
      }
    }
  }
  static isString(data, minLen, maxLen, mandatory) {
    console.log(data);
    let messages = {};
    let string = {};
    let result = {};
    if (mandatory === 'null' || mandatory === null) {
      if (!data) {
        string.null = true;
        return result = {
          result: true,
          data: ''
        }
      } else {
        if (data.length < minLen) {
          messages.minLen = `minimal length for '${data}' is ${minLen}`;
        } else if (data.length >= minLen) {
          string.minLen = true;
        }
        if (maxLen === null || maxLen === 'null') {
          string.maxLen = true;
        } else {
          if (data.length > maxLen) {
            messages.maxLen = `maximal length for '${data}' is ${maxLen}`;
          } else if (data.length <= maxLen) {
            string.maxLen = true;
          }
        }
        if (Object.keys(messages).length > 0) {
          return result = {
            result: false,
            data: messages
          }
        }
        if (string.minLen && string.maxLen) {
          return result = {
            result: true,
            data: data
          };
        }
      }
    }
    if (mandatory === 'not null') {
      if (typeof data === 'string') {
        if (mandatory === 'not null') {
          if (data === 0 || data === null || data === '' || data.length === 0) {
            messages.string = `'string' is required`;
            return result = {
              result: false,
              data: messages
            }
          } else {
            if (data.length < minLen) {
              messages.minLen = `minimal length for '${data}' is ${minLen}`;
            } else if (data.length >= minLen) {
              string.minLen = true;
            }
            if (maxLen === null || maxLen === 'null') {
              string.maxLen = true;
            } else {
              if (data.length > maxLen) {
                messages.maxLen = `maximal length for '${data}' is ${maxLen}`;
              } else if (data.length <= maxLen) {
                string.maxLen = true;
              }
            }
            if (Object.keys(messages).length > 0) {
              return result = {
                result: false,
                data: messages
              }
            }
            if (string.minLen && string.maxLen) {
              return result = {
                result: true,
                data: data
              }
            }
          }
        }
      } else {
        messages.string = `'string' is required`;
        return result = {
          result: false,
          data: messages
        }
      }
    }
  }
  static isValidDate(dateString, mandatory) {
    let result = {};
    if (mandatory === null || mandatory === 'null') {
      if (!dateString) {
        return result = {
          result: true,
          data: null
        }
      } else {
        // First check for the pattern
        if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
            return result = {
              result: false,
              data: `'Date' ${dateString} is invalid`
            };

        // Parse the date parts to integers
        let parts = dateString.split('-');
        let day = parseInt(parts[2], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return result = {
              result: false,
              data: `'Date' ${dateString} is invalid`
            };

        let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        if (day > 0 && day <= monthLength[month - 1]) {
          return result = {
            result: true,
            data: dateString
          }
        }
      }
    }
    if (mandatory === 'not null') {
      if (typeof Number(dateString) === 'number') {
        return result = {
          result: false,
          data: `'Date' ${dateString} is invalid`
        }
      }
      // First check for the pattern
      if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
          return result = {
            result: false,
            data: `'Date' ${dateString} is invalid`
          };

      // Parse the date parts to integers
      let parts = dateString.split('-');
      let day = parseInt(parts[2], 10);
      let month = parseInt(parts[1], 10);
      let year = parseInt(parts[0], 10);

      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return result = {
            result: false,
            data: `'Date' ${dateString} is invalid`
          };

      let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;

      // Check the range of the day
      if (day > 0 && day <= monthLength[month - 1]) {
        return result = {
          result: true,
          data: dateString
        }
      }
    }
  }
  static isIIN(data, mandatory) {
    console.log(data);
    let result = {};
    if (mandatory === null || mandatory === 'null') {
      if (!data) {
        return result = {
          result: true,
          data: ''
        }
      } else {
        if (data && typeof data === 'string') {
          console.log(data.length === 12);
          console.log(Number.isInteger(Number(data)));
          if (data.length === 12 && Number.isInteger(Number(data))) {
            console.log(true)
            return result = {
              result: true,
              data: data
            }
          }
        } else {
          return result = {
            result: false,
            data: `'IIN' must be a string`
          }
        }
      }
    } else if (mandatory === 'not null') {
      console.log(data.length === 12);
      console.log(Number.isInteger(data));
      if (data && typeof data === 'string') {
        if (data.length === 12 && Number.isInteger(data)) {
          console.log(true)
          return result = {
            result: true,
            data: data
          }
        }
      } else {
        return result = {
          result: false,
          data: `'IIN' must be a string`
        }
      }
    }
  }
  static isValidChar(char, a, b, mandatory) {
    let result = {};
    if (mandatory === null || mandatory === 'null') {
      if (!char) {
        return result = {
          result: true,
          data: 'N'
        }
      } else {
        if (typeof char === 'string' && char.length === 1) {
          if (char === a || char === b) {
            return result = {
              result: true,
              data: char
            }
          }
        } else {
          return result = {
            result: false,
            data: `'char' ${char} is invalid`
          }
        }
      }
    } else if (mandatory === 'not null') {
      if (typeof char === 'string' && char.length === 1) {
        if (char === a || char === b) {
          return result = {
            result: true,
            data: char
          }
        } else {
          return result = {
            result: false,
            data: `'char' ${char} is invalid`
          }
        }
      } else {
        return result = {
          result: false,
          data: `'char' is required`
        }
      }
    }
  }
  static isValidEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  static isValidUsername(username) {
    let result = {};
    let re = /^[a-zA-Z0-9_.]+$/;
    if (re.test(username)) {
      return result = {
        result: true,
        data: user
      }
    } else {
      return result = {
        result: false,
        data: `'username' ${username} is invalid`
      }
    }
  }
}
