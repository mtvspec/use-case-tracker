SELECT
  p.id,
  p.iin,
  p."firstName",
  p."lastName",
  p."middleName",
  (
    SELECT row_to_json(cre.*) AS "createdBy"
    FROM
      (
        SELECT u.*
        FROM users.e_user_view u
        WHERE p."createdBy" = u.id) cre)   AS "createdBy",
  (SELECT row_to_json(upd.*) AS "updatedBy"
   FROM (SELECT u.*
         FROM users.e_user_view u
         WHERE p."updatedBy" = u.id) upd)  AS "updatedBy",
  (SELECT row_to_json(del.*) AS "deletedBy"
   FROM (SELECT u.*
         FROM users.e_user_view u
         WHERE p."deletedBy" = u.id) del)  AS "deletedBy",
  (SELECT row_to_json(mod.*) AS "modifiedBy"
   FROM (SELECT u.*
         FROM users.e_user_view u
         WHERE p."modifiedBy" = u.id) mod) AS "modifiedBy",
  p."createdAt",
  p."updatedAt",
  p."deletedAt",
  p."modifiedAt",
  (SELECT row_to_json(state.*) AS state
   FROM (SELECT d.*
         FROM dict.e_dict_value d
         WHERE d.id = p."stateID") state)  AS state,
  p."isDeleted"
FROM persons.e_person p;

SELECT
  p.id,
  p.iin,
  p."firstName",
  p."lastName",
  p."middleName",
  (SELECT row_to_json(cre.*) AS "createdBy"
   FROM (SELECT
           u.id,
           u.username,
           u.iin,
           u."firstName",
           u."lastName",
           u."middleName",
           u.state,
           u."isDeleted",
           u."createdAt"
         FROM users.e_user_view u
         WHERE p."createdBy" = u.id) cre)  AS "createdBy",
  (SELECT row_to_json(upd.*) AS "updatedBy"
   FROM (SELECT
           u.id,
           u.username,
           u.iin,
           u."firstName",
           u."lastName",
           u."middleName",
           u.state,
           u."isDeleted",
           u."createdAt"
         FROM users.e_user_view u
         WHERE p."updatedBy" = u.id) upd)  AS "updatedBy",
  (SELECT row_to_json(del.*) AS "deletedBy"
   FROM (SELECT
           u.id,
           u.username,
           u.iin,
           u."firstName",
           u."lastName",
           u."middleName",
           u.state,
           u."isDeleted",
           u."createdAt"
         FROM users.e_user_view u
         WHERE p."deletedBy" = u.id) del)  AS "deletedBy",
  (SELECT row_to_json(mod.*) AS "modifiedBy"
   FROM (SELECT
           u.id,
           u.username,
           u.iin,
           u."firstName",
           u."lastName",
           u."middleName",
           u.state,
           u."isDeleted",
           u."createdAt"
         FROM users.e_user_view u
         WHERE p."modifiedBy" = u.id) mod) AS "modifiedBy",
  p."createdAt",
  p."updatedAt",
  p."deletedAt",
  p."modifiedAt",
  (SELECT row_to_json(state.*) AS state
   FROM (SELECT d.*
         FROM dict.e_dict_value d
         WHERE d.id = p."stateID") state)  AS state,
  p."isDeleted",
  p.dob,
  (SELECT array_to_json(array_agg(row_to_json(cnt)))
   FROM (SELECT
           c.id,
           (SELECT row_to_json(cnttype.*) AS "contactType"
            FROM (SELECT d.*
                  FROM dict.e_dict_value d
                  WHERE d.id = c."contactTypeID") cnttype) AS "contactType",
           c.value,
           (SELECT row_to_json(state.*) AS state
            FROM (SELECT d.*
                  FROM dict.e_dict_value d
                  WHERE d.id = c."stateID") state)         AS state,
           c."isDeleted",
           c."createdAt"
         FROM persons.e_contact c
         WHERE c."personID" = p.id) cnt)   AS "contacts"
FROM persons.e_person p;