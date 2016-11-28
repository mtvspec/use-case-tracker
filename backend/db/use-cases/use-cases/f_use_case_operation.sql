--============================================================================--
-- Use case operation (f_use_case_operation)
--============================================================================--
CREATE TABLE use_cases.f_use_case_operation (
  id BIGSERIAL,
  d_use_case_operation_type_id INTEGER NOT NULL,
  operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_primary_actor_id BIGINT NOT NULL,
  a_use_case_name VARCHAR (1000) NOT NULL,
  a_use_case_desc TEXT NOT NULL,
  d_use_case_level_id INTEGER NOT NULL,
  d_use_case_type_id INTEGER NOT NULL,
  d_use_case_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_use_case_operation_type_id
      ) REFERENCES use_cases.d_use_case_operation (id),
      FOREIGN KEY (
        e_session_id
      ) REFERENCES sessions.e_session (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
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
-- Create use case (create_use_case)
--============================================================================--
CREATE FUNCTION use_cases.create_use_case (
  IN v_e_primary_actor_id BIGINT,
  IN v_a_use_case_name VARCHAR (1000)
  IN v_a_use_case_desc TEXT,
  IN v_d_use_case_type_id INTEGER,
  IN v_d_use_case_level_id INTEGER,
  IN v_e_session_id BIGINT,
  IN v_e_user BIGINT,
  OUT e_use_case_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    use_cases.e_use_case (
      e_primary_actor_id,
      a_use_case_name,
      a_use_case_desc,
      d_use_case_level_id,
      d_use_case_type_id,
      d_use_case_state_id
    )
  VALUES (
    v_e_primary_actor_id,
    v_a_use_case_name
    v_a_use_case_desc,
    d_use_case_level_id,
    d_use_case_type_id,
    d_use_case_state_id
  )
  RETURNING
    *
)
INSERT INTO
  use_cases.f_use_case_operation (
    d_use_case_slice_operation_type_id,
    e_session_id,
    e_user_id,
    e_use_case_id,
    e_primary_actor_id,
    a_use_case_name,
    a_use_case_desc,
    d_use_case_level_id,
    d_use_case_type_id,
    d_use_case_state_id
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user,
  (SELECT id FROM ins),
  (SELECT e_primary_actor_id FROM ins),
  (SELECT a_use_case_name FROM ins),
  (SELECT a_use_case_desc FROM ins),
  (SELECT d_use_case_level_id FROM ins),
  (SELECT d_use_case_type_id FROM ins),
  (SELECT d_use_case_state_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_use_case_id;
$$ LANGUAGE sql;
--============================================================================--
