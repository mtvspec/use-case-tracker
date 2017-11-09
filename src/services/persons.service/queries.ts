import { convertData } from './../../utils';
import { ICreatePerson, IUpdatePerson, IDeletePerson } from './../../models/person.model';
import { ICreateContact, IUpdateContact, IDeleteContact } from './../../models/contact.model';

const queries = {
  persons: {
    GET_PERSONS_COUNT: () => {
      return `
      SELECT
        count(p.id) "totalCount"
      FROM
        persons.e_person p;`
    },
    GET_PERSONS: () => {
      return `
      SELECT
        p.*
      FROM
        persons.e_person p
      ORDER BY id;`
    },
    SEARCH_PERSONS: (value: string) => {
      // return `
      // SELECT
      //   *
      // FROM persons.e_person WHERE id IN (
      // SELECT
      //   p.id
      // FROM (
      //   SELECT
      //     id,
      //     concat(
      //       coalesce(iin || ' ', ''),
      //       coalesce("lastName" || ' ', ''),
      //       "firstName", ' ',
      //       coalesce("middleName" || ' ', '')) "person"
      // FROM
      //   persons.e_person
      // WHERE "isDeleted" = false) p
      // WHERE lower(person)
      // LIKE lower('%${value}%'));
      // `
      return `
      SELECT
        f.id,
        f."lastName",
        f."firstName",
        f."middleName",
        f."iin"
      FROM persons.e_person f
      WHERE f."isDeleted" = false
      AND lower(concat(f."lastName", ' ', f."firstName", ' ', f."middleName", ' ', f."iin")) ~ lower('\\m${value}')
      ORDER BY
        f."lastName",
        f."firstName",
        f."middleName";
      `
    },
    GET_PERSONS_BY_RECORD_STATE: (isDeleted) => {
      return `
      SELECT
        p.*
      FROM
        persons.e_person p
      WHERE p."isDeleted" = ${isDeleted}
      ORDER BY id;`
    },
    GET_PERSONS_BY_GENDER_ID: (genderID: number) => {
      return `
      SELECT
        p.*
      FROM
        persons.e_person p
      WHERE p."genderID" = ${genderID}
      ORDER BY id;`
    },
    GET_PERSON_BY_ID: (personID: number) => {
      return `
      SELECT
        p.*
      FROM
        persons.e_person p
      WHERE id = ${personID};`
    },
    INSERT_PERSON: (data: ICreatePerson) => {
      return `
      INSERT INTO persons.e_person (
        iin,
        "firstName",
        "lastName",
        "middleName",
        dob,
        "genderID",
        "createdBy",
        "modifiedBy"
      ) VALUES (
        ${convertData(data.iin)},
        '${data.firstName}',
        ${convertData(data.lastName)},
        ${convertData(data.middleName)},
        ${convertData(data.dob)},
        ${data.genderID},
        ${data.user.id},
        ${data.user.id}
      ) RETURNING *;`
    },
    UPDATE_PERSON: (data: IUpdatePerson) => {
      return `
      UPDATE persons.e_person
      SET
        iin = ${convertData(data.iin)},
        "firstName" = '${data.firstName}',
        "lastName" = ${convertData(data.lastName)},
        "middleName" = ${convertData(data.middleName)},
        dob = ${convertData(data.dob)},
        "genderID" = ${data.genderID},
        "updatedBy" = ${data.user.id},
        "updatedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING id;`
    },
    DELETE_PERSON: (data: IDeletePerson) => {
      return `
      UPDATE persons.e_person
      SET
        "isDeleted" = true,
        "deletedBy" = ${data.user.id},
        "deletedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING id;`
    },
    GET_PERSONS_CONTACTS_TOTAL_COUNT: (personID: number) => {
      return `
      SELECT
        count(c.id) "totalCount"
      FROM
        persons.e_contact c
      WHERE c."personID" = ${personID};`
    },
    GET_PERSON_CONTACTS: (personID: number) => {
      return `
      SELECT
        c.*
      FROM
        persons.e_contact c
      WHERE c."personID" = ${personID}
      ORDER BY c.id;`
    },
    GET_PERSON_CONTACT: (contactID: number) => {
      return `
      SELECT
        c.*
      FROM
        persons.e_contact c
      WHERE c.id = ${contactID};`
    },
    INSERT_CONTACT: (data: ICreateContact) => {
      return `
      INSERT INTO persons.e_contact (
        "personID",
        "contactTypeID",
        contact,
        "createdBy",
        "modifiedBy"
      ) VALUES (
        ${data.personID},
        ${data.contactTypeID},
        '${data.contact}',
        ${data.user.id},
        ${data.user.id}
      ) RETURNING id;`
    },
    UPDATE_CONTACT: (data: IUpdateContact) => {
      return `
      UPDATE persons.e_contact
      SET
        "contactTypeID" = ${data.contactTypeID},
        contact = '${data.contact}',
        "updatedBy" = ${data.user.id},
        "updatedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING id;`
    },
    DELETE_CONTACT: (data: IDeleteContact) => {
      return `
      UPDATE persons.e_contact
      SET
        "isDeleted" = true,
        "deletedBy" = ${data.user.id},
        "deletedAt" = 'now()',
        "modifiedBy" = ${data.user.id},
        "modifiedAt" = 'now()'
      WHERE id = ${data.id}
      RETURNING id;`
    }
  }
}
export default queries