'use strict';

const express = require('express');
const app = express();
const persons = express.Router();
var Database = require('./db.js');
var db = new Database();
const Pool = require('pg').Pool;
const pool = new Pool();
const personQueries = require('./persons.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const upload = multer();

const Queries = {
  persons: {
    SELECT_ALL_PERSONS: function () {
      return `select
        id,
        iin,
        last_name "lastName",
        first_name "firstName",
        middle_name "middleName",
        dob,
        gender_id "gender"
      from
        persons.e_person;`;
    },
    SELECT_PERSON_BY_ID(id) {
      return `select
        id,
        iin,
        last_name "lastName",
        first_name "firstName",
        middle_name "middleName",
        dob,
        gender_id "gender"
      from
        persons.e_person
      where
        id = ${id}`;
    },
    INSERT_PERSON(person) {
      return `insert into
      persons.e_person
      (
        iin,
        last_name,
        first_name,
        middle_name,
        dob,
        gender_id
      )
      values
      (
        '${person.iin}',
        '${person.lastName}',
        '${person.firstName}',
        '${person.middleName}',
        '${person.dob}',
        '${person.gender}'
      )
      returning id;`;
    },
    UPDATE_PERSON(person) {
      return `update
        persons.e_person
      set
        iin = '${person.iin}',
        last_name = '${person.lastName}',
        first_name = '${person.firstName}',
        middle_name = '${person.middleName}',
        dob = '${person.dob}',
        gender_id = '${person.gender}'
      where
          id = ${person.id}
        returning id;`;
    },
    DELETE_PERSON(id) {
      return `delete
      from
        persons.e_person
      where
        id = ${id}
      returning id;`;
    }
  }
}

persons
.get('/', function (req, res, next) {
  db.selectAllRecords({text: Queries.persons.SELECT_ALL_PERSONS()}, function (status, data) {
    if (status && status === 200) {
      res.status(status).json(data).end();
    } else if (status && status === 204) {
      res.status(status).end();
    } else {
      res.status(500).end();
    }
  })
})
.get('/:id', function (req, res, next) {
  if (isId(req.params.id)) {
    var id = Number(req.params.id);
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
  db.selectRecordById({text: Queries.persons.SELECT_PERSON_BY_ID(id)}, function (status, data) {
    if (status && status === 200) {
      res.status(status).json(data).end();
    } else if (status && status === 204) {
      res.status(status).end();
    } else {
      res.status(500).end();
    }
  });
})
.post('/', upload.array(), function (req, res, next) {
  isPerson(req.body, function (result, data) {
    if (result) {
      db.updateRecord({text: Queries.persons.INSERT_PERSON(data)}, function (status, data) {
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
.put('/:id', upload.array(), function (req, res, next) {
  if (isId(req.params.id)) {
    isPerson(req.body, function (result, data) {
      if (result) {
        console.log(data);
        data.id = Number(req.params.id);
        db.updateRecord({text: Queries.persons.UPDATE_PERSON(data)}, function (status, data) {
          if (status && status === 200) {
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
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
})
.delete('/:id', function (req, res, next) {
  if (isId(req.params.id)) {
    db.updateRecord({text: Queries.persons.DELETE_PERSON(Number(req.params.id))}, function (status, data) {
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

function isPerson(data, cb) {
  console.log(data);
  let person = {};
  let messages = {};
  if (data) {
    if (data.iin) {
      if (isIin(data.iin)) {
        person.iin = data.iin;
      } else {
        messages.iin = 'Incorrect iin';
      }
    }
    if (data.lastName) {
      if (islastOrFirstName(data.lastName)) {
        person.lastName = data.lastName;
      } else {
        messages.lastName = 'Incorrect lastName';
      }
    }
    if (data.firstName) {
      if (islastOrFirstName(data.firstName)) {
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

function isId(id) {
  if (id && typeof +id === 'number' && Number.isInteger(+id)) {
    return true;
  } else {
    return false;
  }
}

function isIin(iin) {
  if (iin
    && typeof iin === 'string'
    && iin.length === 12
    && Number.isInteger(Number(iin))) {
    return true;
  } else {
    return false;
  }
}

function islastOrFirstName(string) {
  if (string
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
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 300) {
    return true;
  } else {
    return false;
  }
}

function isDate(date) {
  let dob = new Date(date);
  console.log(date instanceof Date);
  if (date
  && typeof date === 'string'
  && date instanceof Date) {
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

app.use('/api/persons', persons);
app.use(function (err, req, res, next) {
  console.log('request');
  console.error(err);
  res.status(500).end();
});
app.listen(3010);
