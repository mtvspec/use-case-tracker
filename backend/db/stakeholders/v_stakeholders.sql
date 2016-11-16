CREATE VIEW stakeholders.v_stakeholders
AS
SELECT
  p.first_name ||' '|| p.last_name "Заинтересованное лицо",
  s.description "Описание"
FROM
  stakeholders.e_stakeholder s,
  persons.e_person p
WHERE
  s.e_person_id = p.id
ORDER BY
  s.id
ASC;
