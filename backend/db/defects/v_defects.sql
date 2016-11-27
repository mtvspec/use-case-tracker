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

CREATE VIEW defects.v_defects
AS

SELECT
  def.id "Код",
  ct.a_component_name "Компонент",
  ucs.a_use_case_slice_name "Слайс",
  dk.a_defect_kind_name_en "Вид дефекта",
  def.a_defect_name "Дефект",
  def.a_defect_desc "Описание",
  to_char(def.cr_date, 'YYYY-MM-DD') "Дата",
  to_char(def.cr_date, 'HH24:MM') "Время"
FROM
  defects.e_defect def,
  components.e_component ct,
  use_case_slices.e_use_case_slice ucs,
  defects.d_defect_kind dk
WHERE
  def.e_use_case_slice_id = ucs.id
AND
  ucs.e_component_id = ct.id
AND
  def.d_defect_kind_id = dk.id
ORDER BY
  ct.id,
  ucs.id,
  dk.id,
  def.a_defect_name
ASC;
