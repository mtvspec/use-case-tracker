--============================================================================--
-- Use-case size (d_use_case_size)
--============================================================================--
CREATE TABLE use_cases.d_use_case_size (
  id SERIAL NOT NULL,
  a_use_case_size_name_en VARCHAR (1000) NOT NULL,
  a_use_case_size_desc_en TEXT,
  a_use_case_size_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_size_desc_ru TEXT,
    PRIMARY KEY (
      a_use_case_size_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_use_case_size_name_ru
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_size (
    a_use_case_size_name_en,
    a_use_case_size_name_ru
  )
VALUES
(
  'Small',
  'Маленький'
),
(
  'Medium',
  'Средний'
),
(
  'Large',
  'Большой'
),
(
  'Very Large',
  'Очень большой'
);
--============================================================================--
