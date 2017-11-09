CREATE OR REPLACE VIEW organizations.e_organizational_view AS
  SELECT
    ou.id,
    (
      SELECT row_to_json(kind.*) AS kind
      FROM
        (
          SELECT d.*
          FROM dict.e_dict_value d
          WHERE d.id = ou."kindID"
        ) kind
    )                                         AS kind,
    (SELECT row_to_json(type.*) AS type
     FROM (SELECT d.*
           FROM dict.e_dict_value d
           WHERE d.id = ou."typeID") type)    AS type,
    ou.name,
    ou.description,
    (SELECT row_to_json(state.*) AS state
     FROM (SELECT d.*
           FROM dict.e_dict_value d
           WHERE d.id = ou."stateID") state)  AS state,
    ou."isDeleted",
    (SELECT row_to_json(cre.*) AS "createdBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE ou."createdBy" = u.id) cre)  AS "createdBy",
    ou."createdAt",
    (SELECT row_to_json(upd.*) AS "updatedBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE ou."updatedBy" = u.id) upd)  AS "updatedBy",
    ou."updatedAt",
    (SELECT row_to_json(del.*) AS "deletedBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE ou."deletedBy" = u.id) del)  AS "deletedBy",
    ou."deletedAt",
    (SELECT row_to_json(mod.*) AS "modifiedBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE ou."modifiedBy" = u.id) mod) AS "modifiedBy",
    ou."modifiedAt"
  FROM organizations.e_organizational_unit ou
  ORDER BY ou.id;