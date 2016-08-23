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
  isPerson(req.body, function (result, data) {
    if (result) {
      db.selectRecordById({
        text: sql.persons.SELECT_PERSON_BY_IIN(Number(data.iin))
      }, function (status, data) {
        console.log(status, data);
        if (status && status === 200) {
          res.status(400).json('Duplicate IIN').end();
        }
      });
      db.insertRecord({
        text: sql.persons.INSERT_PERSON(data, {id: 1})
      }, function (status, data) {
        if (status && status === 201) {
          res.status(status).json(data).end();
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
    if (!data.middleName) {
      person.middleName = '';
    }
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

module.exports = router;
