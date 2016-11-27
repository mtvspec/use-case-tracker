'use strict';

const ID = require ('./../../common/classes/id');
const Person = require('./class.Person.js');
const UserAPI = require('./../users/class.UserAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

class PersonAPI {
  constructor() {

  }
  static getPersons(req, res) {
    db.selectAllRecords({
      text: sql.persons.SELECT_ALL_PERSONS()
    }, function (response) {
      if (response && response.status && response.status === 200) {
        return res.status(response.status).json(response.data).end();
      } else if (response && response.status && response.status === 204) {
        return res.status(response.status).end();
      } else {
        return res.status(500).end();
      }
    });
  }
  static getPersonByID(req, res) {
    let person = new ID(req.params.id);
    if (person.id) {
      db.selectRecordById({
        text: sql.persons.SELECT_PERSON_BY_ID(
          person,
          req.User
        )
      }, function (response) {
        if (response) {
          return res.status(response.status).json(response.data).end();
        } else {
          return res.status(500).end();
        }
      });
    } else {
      return res.status(400).send(`'id' is required`);
    }
  }
  static createPerson(req, res) {
    let result = new Person(req.body);
    let token = req.cookies.session;
    if (result.person) {
      let person = result.person;
      if (person.aPersonIIN) {
        PersonAPI.getPersonByIIN(person.aPersonIIN, res, function (response) {
          if (response) {
            if (response.status === 200) {
              return res
              .status(400)
              .json(`duplicate 'iin': ${person.aPersonIIN}`)
              .end();
            } else if (response.status === 204) {

              if (!token) {
                return res
                .status(401)
                .end();
              } else {
                UserAPI.getUserID(token, function (response) {
                  console.log(sql.persons.INSERT_PERSON(
                    person,
                    {
                      id: response.data.sessionID
                    },
                    {
                      id: response.data.userID
                    }
                  ));
                  if (response.status === 200) {
                    db.insertRecord({
                      text: sql.persons.INSERT_PERSON(
                        person,
                        {
                          id: response.data.sessionID
                        },
                        {
                          id: response.data.userID
                        }
                      )
                    }, function (response) {
                      if (response.status === 201) {
                        return res
                        .status(response.status)
                        .json({
                          id: response.data.create_person
                        })
                        .end();
                      } else {
                        return res
                        .status(response.status)
                        .json(response.data)
                        .end();
                      }
                    });
                  } else {
                    return res
                    .status(401)
                    .json(result.messages)
                    .end();
                  }
                });
              }
            }
          } else {
            return res
            .status(500)
            .end();
          }
        });
      } else {
        if (!token) {
          return res
          .status(401)
          .end();
        } else {
          UserAPI.getUserID(token, function (response) {
            if (response.status === 200) {
              db.insertRecord({
                text: sql.persons.INSERT_PERSON(
                  person,
                  {
                    id: response.data.sessionID
                  },
                  {
                    id: response.data.userID
                  }
                )
              }, function (response) {
                if (response.status === 201) {
                  return res.status(response.status).json({
                    id: response.data.create_person
                  }).end();
                } else {
                  return res.status(response.status).json(response.data).end();
                }
              });
            } else {
              return res
              .status(401)
              .end();
            }
          });
        }
      }
    } else {
      let messages = result.messages;
      if (Object.getOwnPropertyNames(messages).length > 0) {
        return res
        .status(400)
        .json(messages)
        .end();
      }
    }
  }
  static updatePerson(req, res) {
    let id = new ID(req.params.id);
    let person = new Person(req.body);
    if (id.id && person.firstName) {
      person.id = id.id;
      PersonsAPI.getPersonByIIN(person.iin, res, function (response) {
        if (response && (response.status === 200 || response.status === 204)) {
          if (response.id != person.id) {
            db.updateRecord({
              text: sql.persons.UPDATE_PERSON (
                person,
                req.User
              )
            }, function (response) {
              if (response && response.status === 200) {
                return res.status(response.status).json({
                  id: response.data.update_person
                }).end();
              } else if (response.status && response.data) {
                return res.status(response.status).json(response.data).end();
              } else {
                return res.status(500).end();
              }
            });
          } else {
            return res.status(400).json(`duplicate 'iin': ${person.iin}`);
          }
        }
      });
    } else {
      return res.status(400).json(person).end();
    }
  }
  static deletePerson (req, res) {
    let person = new ID(req.params.id);
    if (person.id) {
      db.updateRecord({
        text: sql.persons.DELETE_PERSON (
          person,
          req.User
        )
      }, function (response) {
        if (response && response.status === 200) {
          return res.status(response.status).json({
            id: response.data.delete_person
          }).end();
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    }
  }
  static restorePerson (req, res) {
    let person = new ID(req.params.id);
    if (person.id) {
      db.updateRecord({
        text: sql.persons.RESTORE_PERSON (
          person,
          req.User
        )
      }, function (response) {
        if (response && response.status === 200) {
          return res.status(response.status).json({
            id: response.data.restore_person
          }).end();
        } else {
          return res.status(response.status).json(response.data).end();
        }
      });
    }
  }
}

PersonAPI.getPersonByIIN = function (iin, res, cb) {
  db.selectRecordById({
    text: sql.persons.SELECT_PERSON_BY_IIN(iin)
  }, function (response) {
    if (response && response.status && response.status === 200) {
      return cb({
        status: 200,
        id: response.data.id
      });
    } else if (response && response.status && response.status === 204) {
      return cb({
        status: 204
      });
    }
  });
}

module.exports = PersonAPI;
