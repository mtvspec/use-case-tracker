--============================================================================--
-- Use case model states (d_use_case_model_state)
--============================================================================--
CREATE TABLE use_cases.d_use_case_model_state (
  id SERIAL NOT NULL,
  d_use_case_model_state_name_en VARCHAR (1000) NOT NULL,
  d_use_case_model_state_desc_en TEXT,
  d_use_case_model_state_name_ru VARCHAR (1000),
  d_use_case_model_state_desc_ru TEXT,
    PRIMARY KEY (
      d_use_case_model_state_name_en
    ),
    UNIQUE (
      id
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_model_state (
    d_use_case_model_state_name_en
  )
VALUES
(
  'Created'
);
--============================================================================--
