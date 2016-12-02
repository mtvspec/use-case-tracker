--============================================================================--
-- Use-case subject operation (d_use_case_subject_operation)
--============================================================================--
CREATE TABLE use_cases.d_use_case_subject_operation (
  id SERIAL NOT NULL,
  a_use_case_subject_operation_name_en VARCHAR (1000) NOT NULL,
  a_use_case_subject_operation_desc_en TEXT,
  a_use_case_subject_operation_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_subject_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_use_case_subject_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_use_case_subject_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  use_cases.d_use_case_subject_operation (
    a_use_case_subject_operation_name_en,
    a_use_case_subject_operation_name_ru
  )
VALUES
(
  'Create use-case subject',
  'Создать тему кейса'
),
(
  'Update use-case subject',
  'Обновить тему кейса'
),
(
  'Delete use-case subject',
  'Удалить тему кейса'
);
--============================================================================--
