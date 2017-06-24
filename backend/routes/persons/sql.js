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
      WHERE a_person_iin = '${person.aPersonIIN}';
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
        a_person_iin = ${convertData(person.aPersonIIN)},
        a_person_last_name = ${convertData(person.aPersonLastName)},
        a_person_first_name = ${convertData(person.aPersonFirstName)},
        a_person_middle_name = ${convertData(person.aPersonMiddleName)},
        a_person_dob = ${convertData(person.aPersonDOB)},
        d_person_gender_id = ${convertData(person.dPersonGenderID)}
      WHERE id = ${person.id}
      RETURNING
        id,
        a_person_iin "aPersonIIN",
        a_person_last_name "aPersonLastName",
        a_person_first_name "aPersonFirstName",
        a_person_middle_name "aPersonMiddleName",
        a_person_dob "aPersonDOB",
        d_person_gender_id "dPersonGenderID",
        is_deleted "isDeleted";
      `;
    },
    DELETE_PERSON(person) {
      return `
      UPDATE
        persons.e_person
      SET
        is_deleted = true
      WHERE id = ${person.id}
      RETURNING
        id,
        a_person_iin "aPersonIIN",
        a_person_last_name "aPersonLastName",
        a_person_first_name "aPersonFirstName",
        a_person_middle_name "aPersonMiddleName",
        a_person_dob "aPersonDOB",
        d_person_gender_id "dPersonGenderID",
        is_deleted "isDeleted";
      `;
    },
    RESTORE_PERSON(person) {
      return `
      UPDATE
        persons.e_person
      SET
        is_deleted = false
      WHERE id = ${person.id}
      RETURNING
        id,
        a_person_iin "aPersonIIN",
        a_person_last_name "aPersonLastName",
        a_person_first_name "aPersonFirstName",
        a_person_middle_name "aPersonMiddleName",
        a_person_dob "aPersonDOB",
        d_person_gender_id "dPersonGenderID",
        is_deleted "isDeleted";
      `;
    }
  }
}

module.exports = Queries;

function convertData(data) {
  if (data === undefined) return data = 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}
