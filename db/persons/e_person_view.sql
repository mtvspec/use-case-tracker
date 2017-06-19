CREATE OR REPLACE VIEW persons.e_person_view
AS
SELECT
  id,
  a_person_iin "aPersonIIN",
  a_person_last_name "aPersonLastName",
  a_person_first_name "aPersonFirstName",
  a_person_middle_name "aPersonMiddleName",
  to_char(a_person_dob, 'DD.MM.YYYY') "aPersonDOB",
  d_person_gender_id "dPersonGenderID",
  is_deleted "isDeleted"
FROM
  persons.e_person
ORDER BY
  id ASC;