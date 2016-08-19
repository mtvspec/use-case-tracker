const express = require('express');
const app = express();
const persons = express.Router();
const Pool = require('pg').Pool;
const pool = new Pool();
const personQueries = require('./persons.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const upload = multer();

function SELECT_PERSON_BY_ID(id) {
  'use strict';
  let SELECT_PERSON_BY_ID_TEXT =
  `select
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
    id = ${id}`
  return SELECT_PERSON_BY_ID_TEXT;
}

// db queries
const
SELECT_ALL_PERSONS =
`select
  id,
  iin,
  last_name "lastName",
  first_name "firstName",
  middle_name "middleName",
  dob,
  gender_id "gender"
from
  persons.e_person;`;

persons
.get('/', function (req, res, next) {
  pool.connect(function (err, client, release) {
    pool.on('error', function (e, client) {
      if (e) {
        console.error(e);
        res.status(500).end();
        next();
      }
    });
    if (err) {
      console.error(err);
      res.status(500).end();
      next();
    } else {
      client.query(SELECT_ALL_PERSONS, function (err, result) {
        release();
        if (err) {
          console.error(err);
          res.status(500).end();
          next();
        } else {
          var rowCount = result.rowCount;
          if (rowCount === 0) {
            res.status(204).end();
            next();
          } else {
            if (rowCount > 0) {
              res.status(200).json(result.rows).end();
              next();
            } else {
              console.error(result);
              res.status(500).end();
              next();
            }
          }
        }
      });
    }
  });
})
.get('/:id', function (req, res, next) {
  if (isId(req.params.id)) {
    var id = Number(req.params.id);
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
  pool.on('error', function (e, client) {
    if (e) {
      console.error(e);
      res.status(500).end();
      next();
    }
  });
  pool.connect(function (err, client, release) {
    pool.on('error', function (e, client) {
      if (e) {
        console.error(e);
        res.status(500).end();
        next();
      }
    });
    if (err) {
      console.error(err);
      res.status(500).end();
      next();
    } else {
      client.query(SELECT_PERSON_BY_ID(id), function (err, result) {
        release();
        if (err) {
          console.error(err);
          res.status(500).end();
          next();
        } else {
          var rowCount = result.rowCount;
          if (rowCount === 0) {
            res.status(204).end();
            next();
          } else {
            if (rowCount === 1) {
              res.status(200).json(result.rows[0]).end();
              next();
            } else {
              console.error(result);
              res.status(500).end();
              next();
            }
          }
        }
      });
    }
  });
})
.post('/', upload.array(), function (req, res, next) {
  var person = {
    iin: req.body.iin,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    dob: req.body.dob,
    gender: req.body.gender
  }
  pool.connect(function (err, client, release) {
    pool.on('error', function (e, client) {
      if (e) {
        console.error(e);
        res.status(500).end();
        next();
      }
    });
    if (err) {
      console.error(err);
      res.status(500).end();
      next();
    } else {
      client.query(INSERT_PERSON(person), function (err, result) {
        release();
        if (err) {
          console.error(err);
          res.status(500).end();
          next();
        } else {
          var rowCount = result.rowCount;
          if (rowCount === 0) {
            res.status(204).end();
            next();
          } else {
            if (rowCount === 1) {
              res.status(201).json(result.rows[0]).end();
              next();
            } else {
              console.error(result);
              res.status(500).end();
              next();
            }
          }
        }
      });
    }
  });
})
.put('/:id', upload.array(), function (req, res, next) {
  if (isId(req.params.id)) {
    var id = Number(req.params.id);
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
  var person = {
    id: req.params.id,
    iin: req.body.iin,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    dob: req.body.dob,
    gender: req.body.gender
  }
  pool.connect(function (err, client, release) {
    pool.on('error', function (e, client) {
      if (e) {
        console.error(e);
        res.status(500).end();
        next();
      }
    });
    if (err) {
      console.error(err);
      res.status(500).end();
      next();
    } else {
      client.query(UPDATE_PERSON(person), function (err, result) {
        release();
        if (err) {
          console.error(err);
          res.status(500).end();
          next();
        } else {
          var rowCount = result.rowCount;
          if (rowCount === 1) {
            res.status(200).json(result.rows[0]).end();
            next();
          } else {
            console.error(result);
            res.status(500).end();
            next();
          }
        }
      });
    }
  });
})
.delete('/:id', function (req, res, next) {
  if (isId(req.params.id)) {
    var id = Number(req.params.id);
  } else {
    res.status(400).end('Resource id is required');
    next();
  }
  pool.connect(function (err, client, release) {
    pool.on('error', function (e, client) {
      if (e) {
        console.error(e);
        res.status(500).end();
        next();
      }
    });
    if (err) {
      console.error(err);
      res.status(500).end();
      next();
    } else {
      client.query({
        text: personQueries.persons.deletePerson,
        values: [id]
      }, function (err, result) {
        release();
        if (err) {
          console.error(err);
          res.status(500).end();
          next();
        } else {
          var rowCount = result.rowCount;
          if (rowCount === 1) {
            res.status(200).json(result.rows[0]).end();
            next();
          } else {
            if (rowCount === 0) {
              res.status(204).end();
              next();
            } else {
              console.error(result);
              res.status(500).end();
              next();
            }
          }
        }
      });
    }
  });
});

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

function isStringWithLength200(string) {
  if (string
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 200) {
    return true;
  } else {
    return false;
  }
}

function isStringWithLength300(string) {
  if (string
  && typeof string === 'string'
  && string.length > 1
  && string.length <= 300) {
    return true;
  } else {
    return false;
  }
}

function INSERT_PERSON(person) {
  'use strict';
  let INSERT_PERSON_QUERY =
  `insert into
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
  return INSERT_PERSON_QUERY;
}

function UPDATE_PERSON(person) {
  'use strict';
  let UPDATE_PERSON_QUERY =
  `update
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
  return UPDATE_PERSON_QUERY;
}

app.use('/api/persons', persons);
app.use(function (err, req, res, next) {
  console.log('request');
  console.error(err);
  res.status(500).end();
});
app.listen(3000);
