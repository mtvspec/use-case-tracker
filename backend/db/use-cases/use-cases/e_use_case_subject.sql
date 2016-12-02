--============================================================================--
-- Use-case subject (e_use_case_subject)
--============================================================================--
CREATE TABLE use_cases.e_use_case_subject (
  id BIGSERIAL,
  e_component_id BIGINT NOT NULL,
  a_use_case_subject_name VARCHAR (1000) NOT NULL,
  a_use_case_subject_desc TEXT NOT NULL,
  d_use_case_subject_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        e_component_id,
        e_use_case_subject_id
      )
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        d_use_case_subject_state_id
      ) REFERENCES use_cases.d_use_case_subject_state (id)
);
--============================================================================--
