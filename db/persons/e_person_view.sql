CREATE OR REPLACE VIEW persons.e_person_view
AS
SELECT
  id,
  "aPersonIIN",
  "aPersonLastName",
  "aPersonFirstName",
  "aPersonMiddleName",
  "aPersonDOB",
  "dPersonGenderID",
  "isDeleted"
FROM
  persons.e_person
ORDER BY
  id ASC;