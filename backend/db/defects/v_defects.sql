CREATE VIEW defects.v_defects
AS
SELECT
  d.id "Код",
  s.a_name "Тема",
  d.a_name "Наименование",
  d.a_description "Описание",
  c.status "Статус"
FROM
  defects.e_defect d,
  defects.e_subject s,
  defects.d_defect_status c
WHERE
  d.subject_id = s.id
AND
  d.status_id = c.id
ORDER BY
  d.id
ASC;


SELECT
  s.a_name "Тема",
  d.a_name "Наименование",
  d.a_description "Описание"
FROM
  defects.e_defect d,
  defects.e_subject s,
  defects.d_defect_status c
WHERE
  d.subject_id = s.id
AND
  d.status_id = c.id
ORDER BY
  d.id
ASC;

CREATE VIEW defects.v_defects
AS
SELECT
  d.id "Код",
  ct.a_name "Компонент",
  s.a_name "Тема",
  d.a_name "Наименование",
  d.a_description "Описание"
FROM
  defects.e_defect d,
  defects.e_subject s,
  components.e_component ct,
  defects.d_defect_status c
WHERE
  d.subject_id = s.id
AND
  d.e_component_id = ct.id
AND
  d.status_id = c.id
ORDER BY
  d.id
ASC;
