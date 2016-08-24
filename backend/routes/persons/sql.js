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
        gender_id "gender"
      FROM
       persons.select_persons()
      WHERE
        is_deleted = 'F'`;
    },
    SELECT_PERSON_BY_ID(person, user) {
      return `
      SELECT
        select_person (
          ${person.id},
          ${user.id}
        );`;
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
          '${person.iin}',
          '${person.lastName}',
          '${person.firstName}',
          '${person.middleName}',
          '${person.dob}',
          '${person.gender}',
          ${user.id}
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
          '${person.dob}',
          '${person.gender}',
          ${user.id}
        );`;
    },
    DELETE_PERSON(person, user) {
      return `
      SELECT
        delete_person (
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