--============================================================================--
-- Use-case subject (f_use_case_subject_operation)
--============================================================================--
CREATE TABLE use_cases.f_use_case_subject_operation (
  id BIGSERIAL,
  d_use_case_subject_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_use_case_subject_id INTEGER NOT NULL,
  e_component_id BIGINT NOT NULL,
  a_use_case_subject_name VARCHAR (1000) NOT NULL,
  a_use_case_subject_desc TEXT NOT NULL,
  d_use_case_subject_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    UNIQUE (
      e_component_id,
      e_use_case_subject_id
    ),
    FOREIGN KEY (
      d_use_case_subject_operation_type_id
    ) REFERENCES use_cases.d_use_case_subject_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_use_case_subject_id
    ) REFERENCES use_cases.e_use_case_subject (id),
    FOREIGN KEY (
      e_component_id
    ) REFERENCES components.e_component (id),
    FOREIGN KEY (
      d_use_case_subject_state_id
    ) REFERENCES use_cases.d_use_case_subject_state (id)
);
--============================================================================--
-- Create use-case subject (create_use_case_subject)
--============================================================================--
CREATE FUNCTION use_cases.create_use_case_subject (
  IN v_e_component_id BIGINT,
  IN v_a_use_case_subject_name VARCHAR (1000),
  IN v_a_use_case_subject_desc TEXT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_use_case_subject_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    use_cases.e_use_case_subject (
      e_component_id,
      a_use_case_subject_name,
      a_use_case_subject_desc
    )
  VALUES (
    v_e_component_id,
    v_a_use_case_subject_name,
    v_a_use_case_subject_desc
  )
  RETURNING
    *
)
INSERT INTO
  use_cases.f_use_case_subject_operation (
    d_use_case_subject_operation_type_id,
    e_session_id,
    e_user_id,
    e_use_case_subject_id,
    e_component_id,
    a_use_case_subject_name,
    a_use_case_subject_desc,
    d_use_case_subject_state_id,
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_component_id FROM ins),
  (SELECT a_use_case_subject_name FROM ins),
  (SELECT a_use_case_subject_desc FROM ins),
  1,
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_use_case_subject_id;
$$ LANGUAGE SQL;
