--============================================================================--
-- Use-case complexity (d_use_case_complexity)
--============================================================================--
CREATE TABLE use_cases.d_use_case_complexity (
  id SERIAL NOT NULL,
  a_use_case_complexity_name_en VARCHAR (1000) NOT NULL,
  a_use_case_complexity_desc_en TEXT,
  a_use_case_complexity_name_ru VARCHAR (1000),
  a_use_case_complexity_desc_ru TEXT,
    PRIMARY KEY (
      a_use_case_complexity_name_en
    ),
    UNIQUE (
      id
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_complexity (
    a_use_case_complexity_name_en
  )
VALUES
(
  'Low'
),
(
  'Medium'
),
(
  'High'
);
--============================================================================--
