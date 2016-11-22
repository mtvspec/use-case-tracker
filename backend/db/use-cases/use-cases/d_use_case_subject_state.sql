--============================================================================--
-- Use case subject states (d_use_case_subject_state)
--============================================================================--
CREATE TABLE use_cases.d_use_case_subject_state (
  id SERIAL NOT NULL,
  d_use_case_subject_state_name_en VARCHAR (1000) NOT NULL,
  d_use_case_subject_state_desc_en TEXT,
  d_use_case_subject_state_name_ru VARCHAR (1000),
  d_use_case_subject_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        d_use_case_subject_state_name_en
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_subject_state (
    d_use_case_subject_state_name_en
  )
VALUES
(
  'Created'
);
--============================================================================--
