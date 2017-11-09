CREATE OR REPLACE VIEW customers.e_customer_view AS
  SELECT
    c.id,
    (
      SELECT row_to_json(organization.*) AS organization
      FROM
        (
          SELECT o.*
          FROM organizations.e_organization_view o
          WHERE o.id = c."organizationID"
        ) organization
    ) AS organization,
    c.name,
    c.description,
    (
      SELECT row_to_json(state.*) AS state
      FROM
        (
          SELECT d.*
          FROM dict.e_dict_value d
          WHERE d.id = c."stateID"
        ) state
    ) AS state,
    c."isDeleted",
    (
      SELECT row_to_json(cre.*) AS "createdBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = c."createdBy"
        ) cre
    ) AS "createdBy",
    c."createdAt",
    (
      SELECT row_to_json(upd.*) AS "updatedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = c."updatedBy"
        ) upd
    ) AS "updatedBy",
    c."updatedAt",
    (
      SELECT row_to_json(del.*) AS "deletedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = c."deletedBy"
        ) del
    ) AS "deletedBy",
    c."deletedAt",
    (
      SELECT row_to_json(mod.*) AS "modifiedBy"
      FROM
        (
          SELECT u.*
          FROM users.e_user_view u
          WHERE u.id = c."modifiedBy"
        ) mod
    ) AS "modifiedBy",
    c."modifiedAt"
  FROM customers.e_customer c
  ORDER BY c.id ASC;
