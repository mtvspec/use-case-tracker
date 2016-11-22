--============================================================================--
-- Use case levels (d_use_case_level)
--============================================================================--
CREATE TABLE use_cases.d_use_case_level (
  id SERIAL NOT NULL,
  d_use_case_level_name_en VARCHAR (1000) NOT NULL,
  d_use_case_level_desc_en TEXT,
  d_use_case_level_name_ru VARCHAR (1000),
  d_use_case_level_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      d_use_case_level_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      d_use_case_level_name_ru
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_level (
    d_use_case_level_name_en
  )
VALUES
(
  'Black box'
),
(
  'White box'
);
--============================================================================--
