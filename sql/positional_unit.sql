CREATE OR REPLACE VIEW organizations.e_positional_unit_view AS
  SELECT
    pu.id,
    pu.name,
    pu.description,
    (SELECT row_to_json(ou.*) AS "organizationalUnit"
     FROM (SELECT ou.*
           FROM organizations.e_organizational_unit_view ou
           WHERE ou.id = pu."organizationalUnitID") ou) AS "organizationalUnit",
    (SELECT row_to_json(state.*) AS state
     FROM (SELECT d.*
           FROM dict.e_dict_value d
           WHERE d.id = pu."stateID") state)            AS state,
    pu."isDeleted",
    (SELECT row_to_json(cre.*) AS "createdBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE pu."createdBy" = u.id) cre)            AS "createdBy",
    pu."createdAt",
    (SELECT row_to_json(upd.*) AS "updatedBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE pu."updatedBy" = u.id) upd)            AS "updatedBy",
    pu."updatedAt",
    (SELECT row_to_json(del.*) AS "deletedBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE pu."deletedBy" = u.id) del)            AS "deletedBy",
    pu."deletedAt",
    (SELECT row_to_json(mod.*) AS "modifiedBy"
     FROM (SELECT u.*
           FROM users.e_user_view u
           WHERE pu."modifiedBy" = u.id) mod)           AS "modifiedBy",
    pu."modifiedAt"
  FROM organizations.e_positional_unit pu
  ORDER BY pu.id;