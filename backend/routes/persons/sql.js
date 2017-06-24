'use strict';

const Queries = {
  persons: {
    SELECT_ALL_PERSONS() {
      return `
      SELECT
        p.*
      FROM
        persons.e_person_view p;
      `;
    },
    SELECT_PERSON_BY_IIN(person) {
      return `
      SELECT
        id
      FROM
        persons.e_person
      WHERE "aPersonIIN" = '${person.aPersonIIN}';
      `;
    },
    INSERT_PERSON(person) {
      return `
      INSERT INTO persons.e_person (
          "aPersonIIN",
          "aPersonLastName",
          "aPersonFirstName",
          "aPersonMiddleName",
          "aPersonDOB",
          "dPersonGenderID"
        ) VALUES (
        ${convertData(person.aPersonIIN)},
        ${convertData(person.aPersonLastName)},
        '${person.aPersonFirstName}',
        ${convertData(person.aPersonMiddleName)},
        ${convertData(person.aPersonDOB)},
        ${convertData(person.dPersonGenderID)}
      ) RETURNING *;
      `;
    },
    UPDATE_PERSON(person) {
      return `
      UPDATE
        persons.e_person
      SET
        "aPersonIIN" = ${convertData(person.aPersonIIN)},
        "aPersonLastName" = ${convertData(person.aPersonLastName)},
        "aPersonFirstName" = ${convertData(person.aPersonFirstName)},
        "aPersonMiddleName" = ${convertData(person.aPersonMiddleName)},
        "aPersonDOB" = ${convertData(person.aPersonDOB)},
        "dPersonGenderID" = ${convertData(person.dPersonGenderID)}
      WHERE id = ${person.id}
      RETURNING *;
      `;
    },
    DELETE_PERSON(person) {
      return `
      UPDATE
        persons.e_person
      SET
        "isDeleted" = true
      WHERE id = ${person.id}
      RETURNING *;
      `;
    },
    RESTORE_PERSON(person) {
      return `
      UPDATE
        persons.e_person
      SET
        "isDeleted" = false
      WHERE id = ${person.id}
      RETURNING *;
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}
