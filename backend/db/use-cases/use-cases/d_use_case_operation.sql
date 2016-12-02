--============================================================================--
-- Use case operation (d_use_case_operation)
--============================================================================--
CREATE TABLE use_cases.d_use_case_operation (
  id SERIAL NOT NULL,
  a_use_case_operation_name_en VARCHAR (1000) NOT NULL,
  a_use_case_operation_desc_en TEXT,
  a_use_case_operation_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_use_case_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_use_case_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  use_cases.d_use_case_operation (
    a_use_case_operation_name_en,
    a_use_case_operation_name_ru
  )
VALUES
(
  'Create use case',
  'Создать вариант использования'
),
(
  'Update use case',
  'Обновить вариант использования'
),
(
  'Delete use case',
  'Удалить вариант использования'
),
(
  'Restore use case',
  'Восстановить вариант использования'
);
--============================================================================--
