--============================================================================--
-- Defect (e_defect)
--============================================================================--
CREATE TABLE defects.e_defect (
  id SERIAL NOT NULL,
  d_defect_kind_id INTEGER NOT NULL DEFAULT 1,
  e_component_id INTEGER NOT NULL,
  e_use_case_slice_id INTEGER NOT NULL,
  e_defect_source_id INTEGER NOT NULL,
  a_defect_name VARCHAR (1000) NOT NULL,
  a_defect_desc VARCHAR (4000),
  d_defect_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_component_id,
        e_use_case_slice_id,
        e_source_id,
        a_defect_name
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        d_defect_kind_id
      ) REFERENCES defects.d_defect_kind (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        e_use_case_slice_id
      ) REFERENCES use_cases.use_case_slices (id),
      FOREIGN KEY (
        e_source_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        d_defect_state_id
      ) REFERENCES defects.d_defect_state (id)
);
COMMENT ON TABLE defects.e_defect IS 'E Замечание';
--============================================================================--
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
