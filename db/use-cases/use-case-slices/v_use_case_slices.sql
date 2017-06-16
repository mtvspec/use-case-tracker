-- Тема Вариант использования Слайс Статус
CREATE VIEW use_case_slices.v_use_case_slices
AS
SELECT
  ucs.id "ID",
  ucsj.a_use_case_subject_name "Тема",
  uc.a_use_case_name "Вариант использования",
  ucs.a_use_case_slice_code "Код",
  ucs.a_use_case_slice_name "Слайс",
  ucss.a_use_case_slice_state_name_en "Статус"
FROM
  use_case_slices.e_use_case_slice ucs,
  use_cases.e_use_case uc,
  use_case_slices.d_use_case_slice_state ucss,
  use_cases.e_use_case_subject ucsj
WHERE
  uc.e_use_case_subject_id = ucsj.id
AND
  ucs.e_use_case_id = uc.id
AND
  ucs.d_use_case_slice_state_id = ucss.id
ORDER BY
  ucsj.id,
  uc.id,
  ucs.a_use_case_slice_code,
  ucs.a_use_case_slice_name
ASC;
