--============================================================================--
-- Use case subject states (d_use_case_subject_state)
--============================================================================--
CREATE TABLE use_cases.d_use_case_subject_state (
  id SERIAL NOT NULL,
  a_use_case_subject_state_name_en VARCHAR (1000) NOT NULL,
  a_use_case_subject_state_desc_en TEXT,
  a_use_case_subject_state_name_ru VARCHAR (1000) NOT NULL,
  a_use_case_subject_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_use_case_subject_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_use_case_subject_state_name_ru
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_use_case_subject_state (
    a_use_case_subject_state_name_en,
    a_use_case_subject_state_name_ru
  )
VALUES
(
  'Created',
  'Создан'
);
--============================================================================--
