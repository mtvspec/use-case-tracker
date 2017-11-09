SELECT
  u.id,
  u.username,
  p.iin,
  p."firstName",
  p."lastName",
  p."middleName",
  (
    SELECT row_to_json(state.*) AS state
    FROM
      (
        SELECT d.*
        FROM dict.e_dict_value d
        WHERE d.id = u."stateID"
      ) state
  ) AS state,
  u."isDeleted",
  u."createdAt"
FROM
  users.e_user u,
  persons.e_person p
WHERE u."personID" = p.id;
