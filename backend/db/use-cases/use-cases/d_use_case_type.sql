--============================================================================--
-- Use case types (d_use_case_type)
--============================================================================--
CREATE TABLE use_cases.d_use_case_type (
  id SERIAL NOT NULL,
  a_use_case_type_name_en VARCHAR (1000) NOT NULL,
  a_use_case_type_desc_en TEXT,
  a_use_case_type_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      a_use_case_type_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_use_case_type_desc_ru
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_type (
    a_use_case_type_name_en,
    a_use_case_type_name_ru
  )
VALUES
(
  'Business use-case',
  'Бизнес кейс'
),
(
  'User use-case',
  'Пользовательский кейс'
),
(
  'System use-case',
  'Системный кейс'
);
--============================================================================--
