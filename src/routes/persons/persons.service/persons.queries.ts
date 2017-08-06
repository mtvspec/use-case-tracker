export const PersonsQueries = {
  persons: {
    selectAllPersons () {
      return `
      SELECT
        *
      FROM
        persons.e_person;
      `;
    },
    selectPersonByID (id: number) {
      return `
      SELECT
        p.*
      FROM
        persons.e_person p
      WHERE id = ${id};
      `;
    },
    insertPerson (person) {
      return `
      INSERT INTO
        persons.e_person (
          "iin",
          "lastName",
          "firstName",
          "middleName",
          "dob",
          "genderID"  
        )
      VALUES (
        ${convertData(person.iin)},
        ${convertData(person.lastName)},
        '${person.firstName}',
        ${convertData(person.middleName)},
        ${convertData(person.dob)},
        ${convertData(person.genderID)}
      )
      RETURNING id;`
    },
    updatePerson (person) {
      return `
      UPDATE
        persons.e_person
      SET
        "iin" = ${convertData(person.iin)},
        "lastName" = ${convertData(person.lastName)},
        "firstName" = '${person.firstName}',
        "middleName" = ${convertData(person.middleName)},
        "dob" = ${convertData(person.dob)},
        "genderID" = ${convertData(person.genderID)}
      WHERE
        id = ${person.id}
      RETURNING id;`
    },
    deletePerson (id: number) {
      return `
      UPDATE
        persons.e_person
      SET
        "isDeleted" = true
      WHERE id = ${id}
      RETURNING id;
      `;
    }
  }
}

function convertData(data) {
  if (data === undefined) return 'null';
  return `${data ? "'" + data + "'" : 'null'}`;
}