CREATE OR REPLACE VIEW organizations.e_organizational_unit_view
AS
SELECT
  ou.id,
  ou1.id "key",
  ou.e_organizational_unit_id "parent",
  ou.a_organizational_unit_name "aOrganizationalUnitName",
  ou.is_deleted "isDeleted"
FROM
  organizations.e_organizational_unit ou,
  organizations.e_organizational_unit ou1
WHERE
  ou.id = ou1.id
ORDER BY
  ou.id ASC;