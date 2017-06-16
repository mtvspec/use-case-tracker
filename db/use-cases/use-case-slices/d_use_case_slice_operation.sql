--============================================================================--
-- Use-case slice operation (d_use_case_slice_operation)
--============================================================================--
CREATE TABLE use_case_slices.d_use_case_slice_operation (
  id SERIAL NOT NULL,
  a_use_case_slice_operation_name_en VARCHAR (1000) NOT NULL,
  a_use_case_slice_operation_desc_en TEXT,
  a_use_case_slice_operation_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_slice_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_use_case_slice_operation_name_en,
        a_use_case_slice_operation_name_ru
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_use_case_slice_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  use_case_slices.d_use_case_slice_operation (
    a_use_case_slice_operation_name_en,
    a_use_case_slice_operation_name_ru
  )
VALUES
(
  'Create slice',
  'Создать слайс'
),
(
  'Update slice',
  'Изменить слайс'
),
(
  'Delete slice',
  'Удалить слайс'
),
(
  'Restore slice',
  'Восстановить слайс'
);
--============================================================================--
