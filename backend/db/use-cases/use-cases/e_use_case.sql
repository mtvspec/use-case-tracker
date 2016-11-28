--============================================================================--
-- Use case (e_use_case)
--============================================================================--
CREATE TABLE use_cases.e_use_case (
  id BIGSERIAL,
  e_use_case_subject_id INTEGER NOT NULL,
  e_component_id INTEGER NOT NULL,
  e_primary_actor_id INTEGER NOT NULL,
  a_use_case_name VARCHAR (1000) NOT NULL,
  a_use_case_desc TEXT,
  d_use_case_level_id INTEGER NOT NULL DEFAULT 1,
  d_use_case_type_id INTEGER NOT NULL DEFAULT 2,
  d_use_case_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_use_case_subject_id,
        e_component_id,
        e_primary_actor_id,
        a_use_case_name
      ),
      UNIQUE (
        e_use_case_id
      ),
      FOREIGN KEY (
        e_use_case_subject_id
      ) REFERENCES use_cases.e_use_case_subject (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        e_primary_actor_id
      ) REFERENCES use_cases.e_actor (id),
      FOREIGN KEY (
        d_use_case_level_id
      ) REFERENCES use_cases.d_use_case_level (id),
      FOREIGN KEY (
        d_use_case_type_id
      ) REFERENCES use_cases.d_use_case_type (id)
);
--============================================================================--
