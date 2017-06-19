'use strict';

let persons = [];
const validator = require('indicative');
const db = require('./../../db.js');
const sql = require('./sql.js');
const OperationAPI = require('./../operations/class.OperationAPI.js');
const LogAPI = require('./../log');

module.exports = class PersonAPI {
  static getPersons(cb) {
    if (persons.length > 0) return cb({ status: 200, data: persons });
    else return cb({ status: 204, data: [] });
  }
  static getPersonByID(person, cb) {
    let isFound = false;
    for (let i in persons) {
      if (persons[i].id == person.id) {
        isFound = true;
        return cb({ status: 200, data: persons[i] });
      }
    }
    if (isFound === false) return cb({ status: 204, data: [] });
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
  static createPerson(session, data, cb) {
    const pattern = {
      aPersonIIN: 'string|min:12|max:12',
      aPersonLastName: 'string|min:2|max:100',
      aPersonFirstName: 'required|string|min:2|max:100',
      aPersonMiddleName: 'string|min:2|max:100',
      aPersonDOB: 'date_format:YYYY-MM-DD'
    }
    validator.validateAll(data, pattern).then((person) => {
      if (person.aPersonIIN && !iinCheck(person.aPersonIIN, 1, new Date(person.aPersonDOB), person.dPersonGenderID === 9 ? true : false, true)) throw `invalid iin ${person.aPersonIIN}`;
      db.insertRecord({
        text: sql.persons.INSERT_PERSON(person)
      }, (response) => {
        if (response.status === 201) {
          const person = response.data;
          persons.push(person);
          OperationAPI.createOperation({
            operationTypeID: 1, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logPerson(response.data.id, person);
          });
          return cb({ status: response.status, data: response.data });
        } else if (response) return cb({ status: response.status, data: response.data });
        else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static updatePerson(session, data, cb) {
    const pattern = {
      aPersonIIN: 'string|min:12|max:12',
      aPersonLastName: 'string|min:2|max:100',
      aPersonFirstName: 'required|string|min:2|max:100',
      aPersonMiddleName: 'string|min:2|max:100',
      aPersonDOB: 'date',
      isDeleted: 'boolean',
      id: 'required'
    }
    validator.validateAll(data, pattern).then((person) => {
      if (person.aPersonIIN && !iinCheck(person.aPersonIIN, 1, new Date(person.aPersonDOB), person.dPersonGenderID === 9 ? true : false, true)) throw `invalid iin ${person.aPersonIIN}`;
      db.updateRecord({
        text: sql.persons.UPDATE_PERSON(person)
      }, (response) => {
        if (response.status === 200) {
          const person = response.data;
          for (let i in persons) {
            if (persons[i].id == person.id) {
              persons[i] = person;
              break;
            }
          }
          OperationAPI.createOperation({
            operationTypeID: 11, sessionID: session.sessionID
          }, (response) => {
            if (response.status === 201) LogAPI.logPerson(response.data.id, person);
          });
          return cb({ status: response.status, data: response.data });
        } else return cb({ status: 500, data: null });
      });
    }).catch((errors) => {
      console.error(errors);
      if (errors) return cb({ status: 400, data: errors });
      else return cb({ status: 500, data: null });
    });
  }
  static deletePerson(session, person, cb) {
    db.updateRecord({
      text: sql.persons.DELETE_PERSON(person)
    }, (response) => {
      if (response.status === 200) {
        const person = response.data;
        for (let i in persons) {
          if (persons[i].id == person.id) {
            persons[i] = person;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 12, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logPerson(response.data.id, person);
        });
        return cb({ status: response.status, data: response.data });
      } else return cb({ status: 500, data: null });
    });
  }
  static restorePerson(session, person, cb) {
    db.updateRecord({
      text: sql.persons.RESTORE_PERSON(person)
    }, (response) => {
      if (response.status === 200) {
        const person = response.data;
        for (let i in persons) {
          if (persons[i].id == person.id) {
            persons[i] = person;
            break;
          }
        }
        OperationAPI.createOperation({
          operationTypeID: 13, sessionID: session.sessionID
        }, (response) => {
          if (response.status === 201) LogAPI.logPerson(response.data.id, person);
        });
        return cb({ status: response.status, data: response.data });
      } else return cb({ status: 500, data: null });
    });
  }
}

function iinCheck(iin, clientType, birthDate, sex, isResident) {
  //clientType: 1 - Физ. лицо (ИИН), 2 - Юр. лицо (БИН)
  //birthDate: дата рождения (в формате Javascript Date)
  //sex: true - м, false - ж
  //isResident: true - резидент, false: нерезидент (true: по умолчанию)
  isResident = isResident || true;
  if (!iin) return false;
  if (iin.length != 12) return false;
  if (!(/[0-9]{12}/.test(iin))) return false;
  switch (clientType) {
    case 1:
      //Физ. лицо
      //Проверяем первый фасет на совпадение с датой рождения ГГММДД
      if (iin.substring(0, 6) != (
        "" +
        (birthDate.getYear()) +
        ((birthDate.getMonth() + 1) < 10 ? "0" : "") +
        (birthDate.getMonth() + 1) +
        (birthDate.getDate() < 10 ? "0" : "") +
        birthDate.getDate())) return false;
      //Проверяем пол и век рождения
      let s = parseInt(iin.substring(6, 7));
      if (((s % 2) == 1) != sex) return false;
      if (
        birthDate.getFullYear() < (1800 + parseInt(s / 2) * 100)
        || birthDate.getFullYear() > (1900 + parseInt(s / 2) * 100)) return false;
      break;
    case 2:
      //Юр. лицо
      //Проверяем корректность даты (насколько это возможно)
      let m = parseInt(iin.substring(2, 4));
      if (m > 12) return false;
      //Проверяем признак резидентства
      let r = parseInt(iin.substring(4, 5));
      if (r < 4 || r > 6 || (r == 4 && !isResident) || (r == 5 && isResident)) return false;
      break;
  }
  //Проверяем контрольный разряд
  const b1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const b2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
  let a = [];
  let controll = 0;
  for (let i = 0; i < 12; i++) {
    a[i] = parseInt(iin.substring(i, i + 1));
    if (i < 11) controll += a[i] * b1[i];
  }
  controll = controll % 11;
  if (controll == 10) {
    console.log("s");
    controll = 0;
    for (let i = 0; i < 11; i++)
      controll += a[i] * b2[i];
    controll = controll % 11;
  }
  if (controll != a[11]) return false;
  return true;
}

function _getPersons () {
  db.selectAllRecords({
    text: sql.persons.SELECT_ALL_PERSONS()
  }, (response) => {
    if (response.status === 200) {
      for (let i in response.data) {
        persons.push(response.data[i]);
      }
      return persons;
    } else return persons;
  });
};

_getPersons();