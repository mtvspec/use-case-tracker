'use strict';

const Queries = {
  persons: {
    SELECT_ALL_PERSONS: function () {
      return `
      SELECT
        id,
        a_person_iin "aPersonIIN",
        a_person_last_name "aPersonLastName",
        a_person_first_name "aPersonFirstName",
        a_person_middle_name "aPersonMiddleName",
        to_char(a_person_dob, 'YYYY-MM-DD') "aPersonDOB",
        d_person_gender_id "aPersonGenderID",
        is_deleted "isDeleted"
      FROM
        persons.e_person
      ORDER BY
        id ASC;
      `;
    },
    SELECT_PERSON_BY_ID(person, user) {
      return `
      SELECT
        id,
        iin,
        last_name "lastName",
        first_name "firstName",
        middle_name "middleName",
        to_char(dob, 'YYYY-MM-DD') "dob",
        gender_id "gender",
        is_deleted "isDeleted"
      FROM
        persons.select_person (
          ${person.id},
          ${user.id}
        );`;
    },
    SELECT_PERSON (id) {
      return `
      SELECT
        id
      FROM
        persons.e_person
      WHERE
        id = ${id};`;
    },
    SELECT_PERSON_BY_IIN(iin) {
      return `
      SELECT
        id
      FROM
        persons.e_person
      WHERE
        a_person_iin = '${iin}';
      `;
    },
    INSERT_PERSON(person, session, user) {
      return `
      SELECT
        persons.create_person (
          v_a_person_iin := '${person.aPersonIIN}',
          v_a_person_last_name := '${person.aPersonLastName}',
          v_a_person_first_name := '${person.aPersonFirstName}',
          v_a_person_middle_name := '${person.aPersonMiddleName}',
          v_a_person_dob := ${convertDate(person.aPersonDOB)},
          v_d_person_gender_id := '${person.aPersonGenderID}',
          v_e_session_id := ${session.id},
          v_e_user_id := ${user.id}
        );
      `;
      // console.log(person);
      // let len = person.length;
      // let query;
      //
      // for (var aPersonDOB in person) {
      //   if (person.hasOwnProperty(aPersonDOB)) {
      //     if (person.aPersonDOB === null) {
      //       query = `
      //       SELECT
      //         persons.create_person (
      //           v_a_person_iin := '${person.aPersonIIN}',
      //           v_a_person_last_name := '${person.aPersonLastName}',
      //           v_a_person_first_name := '${person.aPersonFirstName}',
      //           v_a_person_middle_name := '${person.aPersonMiddleName}',
      //           v_a_person_dob := convertDate(person.aPersonDOB),
      //           v_d_person_gender_id := '${person.aPersonGenderID}',
      //           v_e_session_id := ${session.id},
      //           v_e_user_id := ${user.id}
      //         );`
      //       ;
      //     } else {
      //       query = `
      //       SELECT
      //         persons.create_person (
      //           v_a_person_iin := '${person.aPersonIIN}',
      //           v_a_person_last_name := '${person.aPersonLastName}',
      //           v_a_person_first_name := '${person.aPersonFirstName}',
      //           v_a_person_middle_name := '${person.aPersonMiddleName}',
      //           v_a_person_dob := '${person.aPersonDOB}',
      //           v_d_person_gender_id := '${person.aPersonGenderID}',
      //           v_e_session_id := ${session.id},
      //           v_e_user_id := ${user.id}
      //         );
      //       `;
      //     }
      //   }
      // }
      // return query;
    },
    UPDATE_PERSON(person, session, user) {
      return `
      SELECT
        persons.update_person (
          ${person.id},
          '${person.aPersonIIN}',
          '${person.aPersonLastName}',
          '${person.aPersonFirstName}',
          '${person.aPersonMiddleName}',
          ${convertDate(person.aPersonDOB)},
          '${person.aPersonGenderID}',
          ${session.id},
          ${user.id}
        );`;
    },
    DELETE_PERSON(person, user) {
      return `
      SELECT
        persons.delete_person (
          ${person.id},
          ${user.id}
        );`;
    },
    RESTORE_PERSON(person, user) {
      return `
      SELECT
        persons.restore_person (
          ${person.id},
          ${user.id}
        );`;
    }
  }
}

module.exports = Queries;

function convertDate(date) {
  return `${date ? "'" + date + "'" : 'null'}`;
}
