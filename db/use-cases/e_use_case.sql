--============================================================================--
-- Use case (e_use_case)
--============================================================================--
CREATE TABLE use_cases.e_use_case (
  id BIGSERIAL,
  e_use_case_subject_id INTEGER NOT NULL,
  e_primary_actor_id INTEGER NOT NULL,
  a_use_case_code INTEGER NOT NULL,
  a_use_case_name VARCHAR (1000) NOT NULL,
  a_use_case_desc TEXT,
  d_use_case_level_id INTEGER NOT NULL,
  d_use_case_type_id INTEGER NOT NULL,
  d_use_case_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_project_id,
        a_use_case_code
      ),
      FOREIGN KEY (
        e_use_case_subject_id
      ) REFERENCES use_cases.e_use_case_subject (id),
      FOREIGN KEY (
        e_project_id
      ) REFERENCES projects.e_project (id),
      FOREIGN KEY (
        e_primary_actor_id
      ) REFERENCES use_cases.e_actor (id),
      FOREIGN KEY (
        d_use_case_level_id
      ) REFERENCES dict.e_dict_value (id),
      FOREIGN KEY (
        d_use_case_type_id
      ) REFERENCES dict.e_dict_value (id),
      FOREIGN KEY (
        d_use_case_state_id
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--
