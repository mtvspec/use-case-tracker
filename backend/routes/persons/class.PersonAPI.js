'use strict';

const ID = require ('./../../common/classes/id');
const Person = require('./class.Person.js');
const UserAPI = require('./../users/class.UserAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

class PersonAPI {
  constructor() {

  }
  static getPersons(cb) {
    db.selectAllRecords({
      text: sql.persons.SELECT_ALL_PERSONS()
    }, function (response) {
      if (response) {
        return cb({
          status: response.status,
          data: response.data
        });
      } else {
        return cb({
          status: 500,
          data: null
        });
      }
    });
  }
  static getPersonByID(personID, cb) {
    let IDValidationResult = new ID(personID);
    if (IDValidationResult.id) {
      db.selectRecordById({
        text: sql.persons.SELECT_PERSON_BY_ID(personID)
      }, function (response) {
        if (response) {
          return cb(response);
        } else {
          return cb({
            status: 500,
            data: null
          });
        }
      });
    } else {
      return cb({
        status: 400,
        data: `'id' is required`
      });
    }
  }
  static createPerson(req, res) {
    if (!req.cookies.session) {
      return res
      .status(401)
      .end();
    }
    let result = new Person(req.body);
    let token = req.cookies.session;
    if (result.person) {
      let person = result.person;
      if (person.aPersonIIN) {
        PersonAPI.getPersonByIIN(person.aPersonIIN, function (response) {
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
  /***
   * @function updatePerson
   * @param token
   * @param personID
   * @param personData
   * success:
   * @return personID
   * failure:
   * @return 'duplicate iin'
   * @return messages
   */
  static updatePerson(session, person, cb) {
    let idValidationResult = new ID(person.id);
    if (idValidationResult.id) {
      let personValidationResult = new Person(person.data);
      if (personValidationResult.person) {
        let person = personValidationResult.person;
        person.id = idValidationResult.id;
        PersonAPI.getPersonByIIN(person.aPersonIIN, function (response) {
          if (response && (response.status === 200 || response.status === 204)) {
            if (response.id == person.id) {
              db.updateRecord({
                    text: sql.persons.UPDATE_PERSON(
                      person,
                      session.sessionID,
                      session.userID
                    )
                  }, function (response) {
                    if (response && response.status === 200) {
                      return cb({
                        status: response.status,
                        data: {
                          id: response.data.update_person
                        }
                      });
                    } else if (response) {
                      return cb({
                        status: response.status,
                        data: response.data
                      });
                    } else {
                      return cb({
                        status: 500
                      });
                    }
                  });
            } else {
              return cb({
                status: 400,
                data: `duplicate 'iin': ${person.aPersonIIN}`
              });
            }
          }
        });
      } else {
        return cb({
          status: 400,
          data: personValidationResult.messages
        });
      }
    } else {
      return cb({
        status: 400,
        data: idValidationResult.messages
      });
    }
  }
  /***
   * @function deletePerson
   * @param personID
   * @param sessionID
   * @param userID
   * @return cb
   */
  static deletePerson(data, cb) {
    db.updateRecord({
      text: sql.persons.DELETE_PERSON(data)
    }, function (response) {
      return cb(response);
    });
  }
  static restorePerson (data, cb) {
    db.updateRecord({
      text: sql.persons.RESTORE_PERSON(data)
    }, function (response) {
      return cb(response);
    });
  }
}
PersonAPI.getPersonByIIN = function (iin, cb) {
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
