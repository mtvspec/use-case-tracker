--============================================================================--
-- Use-case complexity (d_use_case_complexity)
--============================================================================--
CREATE TABLE use_cases.d_use_case_complexity (
  id SERIAL NOT NULL,
  a_use_case_complexity_name_en VARCHAR (1000) NOT NULL,
  a_use_case_complexity_desc_en TEXT,
  a_use_case_complexity_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_complexity_desc_ru TEXT,
    PRIMARY KEY (
      a_use_case_complexity_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_use_case_complexity_name_ru
    )
);
--============================================================================--
INSERT INTO
  use_cases.d_use_case_complexity (
    a_use_case_complexity_name_en,
    a_use_case_complexity_name_ru
  )
VALUES
(
  'Undefined',
  'Неопределено'
),
(
  'Low',
  'Низкая'
),
(
  'Medium',
  'Средняя'
),
(
  'High',
  'Высокая'
);
--============================================================================--
