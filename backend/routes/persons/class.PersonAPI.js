'use strict';

const ID = require ('./../../common/classes/id');
const Person = require('./class.Person.js');
const UserAPI = require('./../users/class.UserAPI.js');
const db = require('./../../db.js');
const sql = require('./sql.js');

module.exports = class PersonAPI {
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
  static updatePerson(data, cb) {
    const personValidationResult = new Person(data.person);
      if (personValidationResult.person) {
        PersonAPI.getPersonByIIN(data.person.aPersonIIN, function (response) {
          if (response && (response.status === 200)) {
            if (Number(response.data.id) === Number(data.person.id)) {
              db.updateRecord({
                    text: sql.persons.UPDATE_PERSON(data)
                  }, function (response) {
                    if (response) {
                      return cb(response);
                    } else {
                      console.error(new Error());
                      return cb({
                        status: 500,
                        data: null
                      });
                    }
                  });
            } else if (response.status === 204) {
              db.updateRecord({
                text: sql.persons.UPDATE_PERSON(data)
              }, function (response) {
                if (response) {
                  return cb(response);
                } else {
                  console.error(new Error());
                  return cb({
                    status: 500,
                    data: null
                  });
                }
              });
            } else {
              return cb({
                status: 400,
                data: `duplicate 'iin': ${data.person.aPersonIIN}`
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
  static restorePerson (data, cb) {
    db.updateRecord({
      text: sql.persons.RESTORE_PERSON(data)
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
  static getPersonByIIN(aPersonIIN, cb) {
    db.selectRecordById({
      text: sql.persons.SELECT_PERSON_BY_IIN(aPersonIIN)
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
}
