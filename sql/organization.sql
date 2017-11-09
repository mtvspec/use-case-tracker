CREATE OR REPLACE VIEW organizations.e_organization_view AS
  SELECT
    o."id",
    o."name",
    o."officialName",
    (
      SELECT row_to_json(state.*) AS state
      FROM
        (
          SELECT d.*
          FROM dict.e_dict_value d
          WHERE d.id = o."stateID"
        ) state
    ) AS state,
    o."isDeleted",
    (
      SELECT row_to_json(cre.*) AS "createdBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = o."createdBy"
        ) cre
    ) AS "createdBy",
    o."createdAt",
    (
      SELECT row_to_json(upd.*) AS "updatedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = o."updatedBy"
        ) upd
    ) AS "updatedBy",
    o."updatedAt",
    (
      SELECT row_to_json(del.*) AS "deletedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = o."deletedBy"
        ) del
    ) AS "deletedBy",
    o."deletedAt",
    (
      SELECT row_to_json(mod.*) AS "modifiedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = o."modifiedBy"
        ) mod
    ) AS "modifiedBy",
    o."modifiedAt"
  FROM organizations.e_organization o
  ORDER BY o.id ASC;
