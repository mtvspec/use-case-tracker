const Queries = {
  persons: {
    SELECT_ALL_PERSONS: function () {
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
        persons.e_person
      ORDER BY
        id ASC;`;
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
        iin
      FROM
        persons.e_person
      WHERE
        iin = '${iin}';`;
    },
    INSERT_PERSON(person, user) {
      return `
      SELECT
        persons.create_person (
          v_iin := '${person.iin}',
          v_last_name := '${person.lastName}',
          v_first_name := '${person.firstName}',
          v_middle_name := '${person.middleName}',
          v_dob := ${person.dob},
          v_gender_id := '${person.gender}',
          v_user_id := ${user.id}
        );`;
    },
    UPDATE_PERSON(person, user) {
      return `
      SELECT
        persons.update_person (
          ${person.id},
          '${person.iin}',
          '${person.lastName}',
          '${person.firstName}',
          '${person.middleName}',
          ${person.dob},
          '${person.gender}',
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
