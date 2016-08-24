'use strict';

const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const Database = require('./../../db.js');
const db = new Database();

const sql = require('./sql.js');

const validator = require('validator');

router
// GET persons
.get('/', function (req, res, next) {
  if (!req.headers['user-id']) {
    return res.status(401).end();
  } else {
    let user = {
      id: Number(req.headers['user-id'])
    }
    if (isID(req.headers['user-id'])) {
      db.selectAllRecords({
        text: sql.persons.SELECT_ALL_PERSONS(user)
      }, function (status, data) {
        if (status && status === 200) {
          res.status(status).json(data).end();
        } else if (status && status === 204) {
          res.status(status).end();
        } else {
          res.status(500).end();
        }
      });
    } else {
      return res.status(401).end();
    }
  }
})
// GET person by id
.get('/:id', function (req, res, next) {
  if (isID(req.params.id)) {
    db.selectRecordById({
      text: sql.persons.SELECT_PERSON_BY_ID({id: Number(req.params.id)}, {id: 1})
    }, function (status, data) {
      if (status && status === 200) {
        res.status(status).json(data).end();
      } else if (status && status === 204) {
        res.status(status).end();
      } else {
        res.status(500).end();
      }
    });
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
})
// CREATE person
.post('/', function (req, res, next) {
  console.log(req.body);
  if (!req.headers['user-id']) {
    return res.status(401).end();
  } else {
    if (isID(req.headers['user-id'])) {
      let user = {
        id: Number(req.headers['user-id'])
      }
      isPerson(req.body, function (output) {
        if (output.result) {
          let person = output.data;
          db.selectRecordById({
            text: sql.persons.SELECT_PERSON_BY_IIN(Number(output.data.iin))
          }, function (status, data) {
            if (status && status === 200) {
              return res.status(400).json('Duplicate IIN').end();
            } else if (status && status === 204) {
              db.insertRecord({
                text: sql.persons.INSERT_PERSON(person, user)
              }, function (status, data) {
                if (status && status === 201) {
                  return res.status(status).json(data).end();
                } else {
                  return res.status(500).end();
                }
              });
            }
          });
        } else if (output.data) {
          res.status(400).json(output.data).end();
        } else {
          return res.status(400).end();
        }
      });
    } else {
      return res.status(400).end('Incorrect user id');
    }
  }
})
// UPDATE person
.put('/:id', upload.array(), function (req, res, next) {
  if (isID(req.params.id)) {
    isPerson(req.body, function (result, data) {
      if (result) {
        data.id = Number(req.params.id);
        db.updateRecord({
          text: sql.persons.UPDATE_PERSON(data, {id: 1})
        }, function (status, data) {
          if (status && status === 200) {
            res.status(status).json(data).end();
          } else if (status && status === 400) {
            res.status(400).json(data);
          } else {
            res.status(500).end();
          }
        });
      } else if (data) {
        res.status(400).json(data).end();
      } else {
        res.status(400).end();
      }
    });
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
})
// DELETE PERSON
.delete('/:id', function (req, res, next) {
  if (isID(req.params.id)) {
    db.updateRecord({
      text: sql.persons.DELETE_PERSON({id: Number(req.params.id)}, {id: 1})
    }, function (status, data) {
      if (status && status === 200) {
        res.status(status).json(data).end();
      } else {
        res.status(500).end();
      }
    });
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
})
// RESTORE person
.options('/:id', function (req, res, next) {
  if (isID(req.params.id)) {
    db.updateRecord({
      text: sql.persons.RESTORE_PERSON({id: Number(req.params.id)}, {id: 1})
    }, function (status, data) {
      if (status && status === 200) {
        res.status(status).json(data).end();
      } else {
        res.status(500).end();
      }
    });
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
});

// Validators
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
    console.log(data);
    if (data.iin) {
      if (isIIN(data.iin)) {
        person.iin = data.iin;
      } else {
        messages.iin = `Incorrect 'iin': ${data.iin}`;
      }
    } else {
      person.iin = '';
    }
    if (data.lastName) {
      if (isLastName(data.lastName)) {
        person.lastName = data.lastName;
      } else {
        messages.lastName = `Incorrect 'lastName': ${data.lastName}`;
      }
    } else {
      messages.lastName = `'lastName' is required`;
    }
    if (data.firstName) {
      if (isFirstName(data.firstName)) {
        person.firstName = data.firstName;
      } else {
        messages.firstName = `Incorrect 'firstName': ${data.firstName}`;
      }
    } else {
      messages.firstName = `'firstName' is required`;
    }
    if (data.middleName) {
      if (isMiddleName(data.middleName)) {
        person.middleName = data.middleName;
      } else {
        messages.middleName = `Incorrect 'middleName': ${data.middleName}`;
      }
    } else {
      person.middleName = '';
    }
    if (data.dob) {
      if (isValidDate(data.dob)) {
        person.dob = data.dob;
      } else {
        messages.dob = `Incorrect 'dob': ${data.dob}`;
      }
    } else {
      messages.dob = `'dob' is required`;
    }
    if (data.gender) {
      if (isGender(data.gender)) {
        person.gender = data.gender;
      } else {
        messages.gender = `Incorrect 'gender': ${data.gender}`;
      }
    } else {
      messages.gender = `'gender' is required`
    }
    if (Object.keys(messages).length > 0) {
      console.log(messages);
      return cb({
        result: false,
        data: messages
      });
    } else {
      return cb({
        result: true,
        data: person
      });
    }
  } else {
    return cb({
      result: false
    });
  }
}

function isIIN (iin) {
  console.log(iin.length);
  if (iin
    && typeof iin === 'string'
    && iin.length === 12
    && Number.isInteger(Number(iin))) {
    return true;
  } else {
    return false;
  }
}

function isLastName (string) {
  if (string
  && validator.isAlpha(string, 'ru-RU')
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 400) {
    return true;
  } else {
    return false;
  }
}

function isFirstName (string) {
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

function isMiddleName (string) {
  if (string
  && validator.isAlpha(string, 'ru-RU')
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 500) {
    return true;
  } else {
    return false;
  }
}

function isValidDate (dateString)
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

function isGender (gender) {
  if (gender
  && typeof gender === 'string'
  && gender.length === 1
  && (gender === 'M' || gender === 'F')) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
