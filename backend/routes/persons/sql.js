const Queries = {
  persons: {
    SELECT_ALL_PERSONS: function () {
      return `
      SELECT
        id,
        iin,
        last_name,
        first_name,
        middle_name,
        to_char(dob, 'YYYY-MM-DD'),
        gender_id
      FROM
       select_persons()
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
        create_person (
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
        update_person (
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
        restore_person (
          ${person.id},
          ${user.id}
        );`;
    }
  }
}

module.exports = Queries;
