--============================================================================--
-- Use case levels (d_use_case_level)
--============================================================================--
CREATE TABLE use_cases.d_use_case_level (
  id SERIAL NOT NULL,
  a_use_case_level_name_en VARCHAR (1000) NOT NULL,
  a_use_case_level_desc_en TEXT,
  a_use_case_level_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_level_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      a_use_case_level_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      a_use_case_level_name_ru
    )
);
--============================================================================--
INSERT INTO
  use_cases.d_use_case_level (
    a_use_case_level_name_en,
    a_use_case_level_name_ru
  )
VALUES
(
  'Black box',
  'Черный ящик'
),
(
  'White box',
  'Прозрачный ящик'
);
--============================================================================--
