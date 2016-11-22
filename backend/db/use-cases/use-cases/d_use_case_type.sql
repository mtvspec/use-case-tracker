--============================================================================--
-- Use case types (d_use_case_type)
--============================================================================--
CREATE TABLE use_cases.d_use_case_type (
  id SERIAL NOT NULL,
  d_use_case_type_name_en VARCHAR (1000) NOT NULL,
  d_use_case_type_desc_en TEXT,
  d_use_case_type_name_ru VARCHAR (1000),
  d_use_case_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      d_use_case_type_name_en
    ),
    UNIQUE (
      id
    ),
    UNIQUE (
      d_use_case_type_desc_ru
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_type (
    d_use_case_type_name_en
  )
VALUES
(
  'Business use-case'
),
(
  'User use-case'
),
(
  'System use-case'
);
--============================================================================--
